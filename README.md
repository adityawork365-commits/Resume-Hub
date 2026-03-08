# Resume-Hub - AI-Powered Resume Screening System

Author: Aditya
GitHub: https://github.com/adityawork365

An intelligent resume screening system that uses AI and semantic matching to rank candidates against job descriptions.

---

## Features

* **AI-Powered Matching**: Uses transformer-based models (Sentence-BERT) for semantic similarity
* **Multi-Format Support**: PDF, DOCX, TXT, PNG, JPG resume uploads
* **Professional Dashboard**: Modern, responsive UI with real-time results
* **Candidate Ranking**: Automatic scoring and ranking based on job fit
* **Skill Extraction**: Identifies relevant skills from resumes
* **Export Results**: Download results as CSV for further analysis
* **Explainable AI**: Clear explanations for each candidate's score

---

## Tech Stack

### Backend

* **Flask**: Web framework
* **Sentence-Transformers**: Semantic embeddings (all-MiniLM-L6-v2)
* **PyPDF2**: PDF parsing
* **python-docx**: DOCX parsing
* **pytesseract**: OCR for image-based resumes
* **spaCy & NLTK**: Text preprocessing
* **scikit-learn**: Similarity calculations

### Frontend

* **React.js**: UI framework
* **Axios**: API communication
* **CSS3**: Modern styling with gradients and animations

---

## Installation

### Prerequisites

* Python 3.8+
* Node.js 14+
* Tesseract OCR (for image processing)

---

## Backend Setup

1. Navigate to backend directory

```
cd backend
```

2. Create virtual environment

```
python -m venv venv
```

Activate environment

Windows:

```
venv\Scripts\activate
```

Linux / Mac:

```
source venv/bin/activate
```

3. Install dependencies

```
pip install -r requirements.txt
```

4. Download spaCy model

```
python -m spacy download en_core_web_sm
```

5. Download NLTK data

```
python -c "import nltk; nltk.download('punkt'); nltk.download('stopwords')"
```

6. Start backend server

```
python app.py
```

Backend runs on:

```
http://localhost:5000
```

---

## Frontend Setup

1. Navigate to frontend folder

```
cd frontend
```

2. Install dependencies

```
npm install
```

3. Start development server

```
npm start
```

Frontend runs on:

```
http://localhost:3000
```

---

## Usage

### Step 1: Login

Demo credentials

Email:

```
admin@smartscreen.ai
```

Password:

```
admin123
```

---

### Step 2: Enter Job Description

Paste job description including:

* Job title
* Required skills
* Responsibilities
* Experience requirements

---

### Step 3: Upload Resumes

Upload formats:

* PDF
* DOCX
* TXT
* PNG
* JPG

Maximum file size:

```
16MB per file
```

---

### Step 4: Review Results

* View ranked candidates
* Filter by score category
* View candidate details
* Export results as CSV

---

## How It Works

### 1. Document Parsing

Extracts text from multiple formats using different parsers.

### 2. Text Preprocessing

* Removes noise
* Cleans special characters
* Extracts key information

### 3. Semantic Embedding

Uses **Sentence-BERT (all-MiniLM-L6-v2)** model.

* Embedding size: **384 dimensions**
* Captures semantic meaning beyond keyword matching

### 4. Similarity Calculation

Uses **cosine similarity** to compare resume and job description.

Score range:

```
0 – 100%
```

---

### 5. Ranking & Explanation

Candidates are ranked by match score.

Explanation includes:

* similarity score
* matched skills
* experience relevance

---

## Scoring Categories

Excellent

```
75%+
```

Good

```
60 – 74%
```

Moderate

```
45 – 59%
```

Low

```
Below 45%
```

---

## API Endpoints

### Login

POST

```
/api/login
```

Request example

```
{
 "email": "admin@smartscreen.ai",
 "password": "admin123"
}
```

---

### Resume Screening

POST

```
/api/screen
```

Parameters

* jobDescription
* resumes (multiple files)

---

### Health Check

GET

```
/api/health
```

---

## Project Structure

```
Resume-Hub
│
├── backend
│   ├── app.py
│   ├── requirements.txt
│   ├── models
│   │   └── screening.py
│   └── utils
│       ├── parser.py
│       ├── preprocessor.py
│       └── matcher.py
│
├── frontend
│   ├── package.json
│   ├── public
│   │   └── index.html
│   └── src
│       ├── App.js
│       ├── index.js
│       ├── index.css
│       ├── components
│       │   ├── Login.js
│       │   ├── Upload.js
│       │   └── Results.js
│       └── utils
│           └── api.js
│
└── README.md
```

---

## Model Information

Model:

```
all-MiniLM-L6-v2
```

Model size:

```
~80MB
```

Embedding dimension:

```
384
```

Average inference time:

```
~10ms
```

---

## Troubleshooting

### Backend Issues

Model download fails

```
from sentence_transformers import SentenceTransformer
model = SentenceTransformer('all-MiniLM-L6-v2')
```

OCR not working

Install Tesseract:

Linux

```
sudo apt-get install tesseract-ocr
```

Or download from

https://github.com/UB-Mannheim/tesseract/wiki

---

Port already in use

Change port in `app.py`

```
app.run(debug=True, host='0.0.0.0', port=5001)
```

---

### Frontend Issues

CORS errors

* Ensure backend runs on port **5000**
* Check `API_BASE_URL` in

```
frontend/src/utils/api.js
```

---

Connection refused

* Ensure backend server is running
* Check firewall settings

---

## Future Enhancements

* User authentication with database
* Resume storage and history
* Batch processing
* Advanced filters
* Interview scheduling
* Email notifications
* Multiple job comparison
* Candidate feedback system

---

## License

This project is for **educational purposes**.

---

## Credits

Built with:

* Sentence-Transformers
* React.js
* Flask

---

Demo Credentials

Email

```
admin@smartscreen.ai
```

Password

```
admin123
```

Note:

First run will download the ML model (~80MB). After that, the system will run faster.
