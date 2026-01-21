from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
from models.screening import ScreeningEngine
import traceback

app = Flask(__name__)
CORS(app)

# Configuration
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'pdf', 'docx', 'txt', 'png', 'jpg', 'jpeg'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Create uploads folder if it doesn't exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Initialize screening engine (loaded once on startup)
print("Initializing SmartScreen AI...")
screening_engine = ScreeningEngine()
print("SmartScreen AI ready!")

# Mock user database (in production, use real database)
users = {
    'admin@smartscreen.ai': {'password': 'admin123', 'name': 'Admin User'},
    'recruiter@company.com': {'password': 'recruiter123', 'name': 'Recruiter'}
}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/api/login', methods=['POST'])
def login():
    """Handle user login"""
    data = request.json
    email = data.get('email')
    password = data.get('password')
    
    if email in users and users[email]['password'] == password:
        return jsonify({
            'success': True,
            'user': {
                'email': email,
                'name': users[email]['name']
            }
        })
    else:
        return jsonify({
            'success': False,
            'error': 'Invalid credentials'
        }), 401

@app.route('/api/screen', methods=['POST'])
def screen_resumes():
    """Screen resumes against job description"""
    try:
        # Get job description
        job_description = request.form.get('jobDescription')
        if not job_description:
            return jsonify({'error': 'Job description is required'}), 400
        
        # Get uploaded files
        files = request.files.getlist('resumes')
        if not files or len(files) == 0:
            return jsonify({'error': 'At least one resume is required'}), 400
        
        # Save files temporarily
        resume_files = []
        for file in files:
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                file.save(filepath)
                resume_files.append((filepath, filename))
        
        if not resume_files:
            return jsonify({'error': 'No valid resume files uploaded'}), 400
        
        # Screen candidates
        print(f"Screening {len(resume_files)} resumes...")
        results = screening_engine.screen_candidates(resume_files, job_description)
        
        # Clean up uploaded files
        for filepath, _ in resume_files:
            try:
                os.remove(filepath)
            except:
                pass
        
        return jsonify({
            'success': True,
            'results': results,
            'total_candidates': len(results)
        })
    
    except Exception as e:
        print("Error:", str(e))
        print(traceback.format_exc())
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'service': 'SmartScreen AI'})

if __name__ == '__main__':
    print("\n" + "="*50)
    print("SmartScreen AI Resume Screening System")
    print("="*50)
    print("Server starting on http://localhost:5000")
    print("="*50 + "\n")
    app.run(debug=True, host='0.0.0.0', port=5000)