# 📄 Resume-Hub: AI-Powered Resume Screening System

An intelligent, end-to-end resume screening platform leveraging Transformer-based semantic embeddings to rank candidate profiles against job requirements in real time.

---

### 👤 Author

**Aditya** | [GitHub Profile](https://github.com/adityawork365-commits) & 
**Nadeem Khan** | [GitHub Profile](https://github.com/nadeemkhan14)

---

## 🌟 Overview

**Resume-Hub** solves the high-volume screening challenge faced by recruiters and HR teams. Modern applicant tracking systems (ATS) often rely on strict keyword matching, which can miss qualified candidates who phrase their experience differently.

Resume-Hub addresses this by using **Sentence-Transformers (`all-MiniLM-L6-v2`)** to convert both job descriptions and candidate resumes into 384-dimensional dense vector embeddings. By calculating cosine similarity between these semantic vectors, the platform evaluates candidate capability and skill relevance based on contextual meaning rather than simple keyword matching.

---

## 📸 Application Interface

### 1. Authentication Portal

Modern glassmorphism login interface with demo account integration.

![Login Screen](./Screenshot%202026-08-09%20190242.png)

### 2. Job Description & Ingestion Portal

Supports multi-format uploading (PDF, DOCX, TXT, and OCR for PNG/JPG) with real-time status tracking.

![Upload Screen](./Screenshot%202026-08-09%20184335.png)

### 3. Real-Time Screening Dashboard

Ranked candidate profiles with match confidence scores, extracted skills, and categorization tiers.

![Results Dashboard](./Screenshot%202026-08-09%20190237.png)

---

## ✨ Key Features

- 🧠 **Semantic AI Matching**: Uses `Sentence-BERT` for contextual semantic similarity beyond keyword matching.
- 📂 **Multi-Format Ingestion**: Native parsing for PDF, DOCX, TXT, plus **Tesseract OCR** for image resumes (PNG/JPG).
- 📊 **Interactive Scoring Tiers**: Categorizes applicants into score tiers:
  - 🟢 **Excellent**: >= 75%
  - 🔵 **Good**: 60% - 74%
  - 🟡 **Moderate**: 45% - 59%
  - 🔴 **Low**: < 45%
- 🔍 **Automated Entity & Skill Extraction**: Uses `spaCy` and `NLTK` to extract core skill keywords from unstructured document text.
- 📈 **Analytics Export**: Single-click export of structured candidate ranking reports into standard CSV format.

---

## 🛠 Tech Stack

| Domain | Technologies Used |
| :--- | :--- |
| **Frontend Framework** | React.js, Axios, Modern Responsive CSS3 |
| **Backend Framework** | Flask (Python RESTful API) |
| **AI / Machine Learning** | PyTorch, Sentence-Transformers (`all-MiniLM-L6-v2`), Scikit-Learn |
| **NLP & Ingestion Engines** | spaCy, NLTK, PyPDF2, python-docx, PyTesseract (OCR) |

---

## ⚙️ How It Works

1. **Document Parsing**: Text is extracted from uploaded files (PDF, DOCX, TXT, or PNG/JPG via Tesseract OCR).
2. **Text Preprocessing**: Extracted text is cleaned using `spaCy` and `NLTK` to remove noise and normalize the content.
3. **Semantic Embedding**: Job descriptions and resumes are converted into 384-dimensional dense vectors using `all-MiniLM-L6-v2`.
4. **Similarity Engine**: Cosine similarity is calculated between the job description and resume embeddings.
5. **Ranking & Insights**: Candidate scores are generated on a 0–100% scale and categorized into actionable screening tiers on the React dashboard.

---

## 📂 Project Structure

    Resume-Hub/
    │
    ├── backend/
    │   ├── app.py
    │   ├── requirements.txt
    │   ├── models/
    │   │   └── screening.py
    │   └── utils/
    │       ├── parser.py
    │       ├── preprocessor.py
    │       └── matcher.py
    │
    ├── frontend/
    │   ├── package.json
    │   ├── public/
    │   │   └── index.html
    │   └── src/
    │       ├── App.js
    │       ├── components/
    │       │   ├── Login.js
    │       │   ├── Upload.js
    │       │   └── Results.js
    │       └── utils/
    │           └── api.js
    │
    └── README.md

---

## 🚀 Quick Installation & Setup

### Prerequisites

- **Python 3.8+**
- **Node.js 14+**
- **Tesseract OCR Engine** ([Install Guide](https://github.com/UB-Mannheim/tesseract/wiki))

### 1. Backend Setup

Navigate to the backend directory:

    cd backend

Create and activate a virtual environment:

    python -m venv venv

**Windows:**

    venv\Scripts\activate

**Linux/Mac:**

    source venv/bin/activate

Install the required packages:

    pip install -r requirements.txt

Download the required NLP language model and datasets:

    python -m spacy download en_core_web_sm
    python -c "import nltk; nltk.download('punkt'); nltk.download('stopwords')"

Start the Flask development server:

    python app.py

**Backend runs on:** `http://localhost:5000`

### 2. Frontend Setup

Navigate to the frontend directory:

    cd frontend

Install Node modules:

    npm install

Start the React development server:

    npm start

**Frontend runs on:** `http://localhost:3000`

---

## 🔐 Demo Credentials

Use these credentials to log in and evaluate the application:

| **Field** | **Value** |
| :--- | :--- |
| **Email** | `admin@smartscreen.ai` |
| **Password** | `admin123` |

---

## 🔧 Troubleshooting

- **Model Download Failure**: Manually trigger the initial model download in a Python shell:

      from sentence_transformers import SentenceTransformer

      model = SentenceTransformer('all-MiniLM-L6-v2')

- **OCR Issues**: Ensure Tesseract is installed correctly and added to your system environment variables (`PATH`).

- **CORS Errors**: Confirm that the Flask backend is actively running on port `5000`.

---

## 📜 License & Credits

This project is open-source for **educational and portfolio evaluation purposes**.

Built by [Aditya](https://github.com/adityawork365-commits).
