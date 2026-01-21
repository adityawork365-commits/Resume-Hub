# SmartScreen - AI-Powered Resume Screening System

An intelligent resume screening system that uses AI and semantic matching to rank candidates against job descriptions.

## Features

- **AI-Powered Matching**: Uses transformer-based models (Sentence-BERT) for semantic similarity
- **Multi-Format Support**: PDF, DOCX, TXT, PNG, JPG resume uploads
- **Professional Dashboard**: Modern, responsive UI with real-time results
- **Candidate Ranking**: Automatic scoring and ranking based on job fit
- **Skill Extraction**: Identifies relevant skills from resumes
- **Export Results**: Download results as CSV for further analysis
- **Explainable AI**: Clear explanations for each candidate's score

## Tech Stack

### Backend
- **Flask**: Web framework
- **Sentence-Transformers**: Semantic embeddings (all-MiniLM-L6-v2)
- **PyPDF2**: PDF parsing
- **python-docx**: DOCX parsing
- **pytesseract**: OCR for image-based resumes
- **spaCy & NLTK**: Text preprocessing
- **scikit-learn**: Similarity calculations

### Frontend
- **React.js**: UI framework
- **Axios**: API communication
- **CSS3**: Modern styling with gradients and animations

## Installation

### Prerequisites
- Python 3.8+
- Node.js 14+
- Tesseract OCR (for image processing)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Download spaCy model:
```bash
python -m spacy download en_core_web_sm
```

5. Download NLTK data:
```python
python -c "import nltk; nltk.download('punkt'); nltk.download('stopwords')"
```

6. Start the backend server:
```bash
python app.py
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

Frontend will run on `http://localhost:3000`

## Usage

### Step 1: Login
- Use demo credentials:
  - **Email**: admin@smartscreen.ai
  - **Password**: admin123

### Step 2: Enter Job Description
- Paste the complete job description including:
  - Job title and role
  - Required skills and qualifications
  - Responsibilities
  - Experience requirements

### Step 3: Upload Resumes
- Drag & drop or click to browse
- Upload multiple resumes (PDF, DOCX, TXT, PNG, JPG)
- Maximum file size: 16MB per file

### Step 4: Review Results
- View ranked candidates with match scores
- Filter by score categories (Excellent, Good, Moderate, Low)
- Click on candidates to see detailed information
- Export results as CSV

## How It Works

### 1. Document Parsing
- Extracts text from various formats using appropriate parsers
- Handles PDFs, Word documents, text files, and images (OCR)

### 2. Text Preprocessing
- Cleans and normalizes text
- Removes noise, URLs, and special characters
- Extracts contact information and key details

### 3. Semantic Embedding
- Uses Sentence-BERT (all-MiniLM-L6-v2) model
- Generates 384-dimensional embeddings for resumes and job descriptions
- Captures semantic meaning beyond keyword matching

### 4. Similarity Calculation
- Computes cosine similarity between embeddings
- Scores range from 0-100%
- Higher scores indicate better fit

### 5. Ranking & Explanation
- Sorts candidates by match score
- Provides explanations based on:
  - Overall similarity score
  - Matched skills
  - Experience level

## Scoring Categories

- **Excellent (75%+)**: Strong match, highly recommended
- **Good (60-74%)**: Good fit with relevant skills
- **Moderate (45-59%)**: Partial match, review carefully
- **Low (<45%)**: Limited match to requirements

## API Endpoints

### POST /api/login
Login endpoint
```json
{
  "email": "admin@smartscreen.ai",
  "password": "admin123"
}
```

### POST /api/screen
Screen resumes against job description
- **Content-Type**: multipart/form-data
- **Parameters**:
  - `jobDescription`: Job description text
  - `resumes`: Multiple resume files

### GET /api/health
Health check endpoint

## Project Structure

```
smartscreen/
├── backend/
│   ├── app.py                 # Flask application
│   ├── requirements.txt       # Python dependencies
│   ├── models/
│   │   └── screening.py       # Main screening engine
│   └── utils/
│       ├── parser.py          # Document parsing
│       ├── preprocessor.py    # Text preprocessing
│       └── matcher.py         # Semantic matching
├── frontend/
│   ├── package.json
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── App.js             # Main app component
│       ├── index.js
│       ├── index.css
│       ├── components/
│       │   ├── Login.js       # Login page
│       │   ├── Upload.js      # Upload & screening page
│       │   └── Results.js     # Results display
│       └── utils/
│           └── api.js         # API functions
└── README.md
```

## Model Information

**Sentence-BERT Model**: all-MiniLM-L6-v2
- **Size**: ~80MB
- **Embedding Dimension**: 384
- **Performance**: Fast inference (~10ms per text)
- **Quality**: Good balance of speed and accuracy

## Troubleshooting

### Backend Issues

**Model download fails**:
```bash
# Manually download model
from sentence_transformers import SentenceTransformer
model = SentenceTransformer('all-MiniLM-L6-v2')
```

**OCR not working**:
- Install Tesseract: `sudo apt-get install tesseract-ocr` (Linux)
- Or download from: https://github.com/UB-Mannheim/tesseract/wiki

**Port already in use**:
```bash
# Change port in app.py
app.run(debug=True, host='0.0.0.0', port=5001)
```

### Frontend Issues

**CORS errors**:
- Ensure backend is running on port 5000
- Check API_BASE_URL in `frontend/src/utils/api.js`

**Connection refused**:
- Verify backend is running
- Check firewall settings

## Future Enhancements

- [ ] User authentication with database
- [ ] Resume storage and history
- [ ] Batch processing for large volumes
- [ ] Advanced filters (location, salary, etc.)
- [ ] Interview scheduling integration
- [ ] Email notifications
- [ ] Multiple job descriptions comparison
- [ ] Candidate feedback loop

## License

This project is for educational purposes.

## Credits

Built with:
- Sentence-Transformers by UKPLab
- React.js by Meta
- Flask by Pallets

---

**Demo Credentials**:
- Email: admin@smartscreen.ai
- Password: admin123

**Note**: First run will download the ML model (~80MB). Subsequent runs will be faster.