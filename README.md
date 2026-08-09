<div align="center">

# 📄 Resume-Hub: AI-Powered Resume Screening System

An intelligent, end-to-end resume screening platform leveraging Transformer-based semantic embeddings to rank candidate profiles against job requirements in real time.

[![Python](https://img.shields.io/badge/Python-3.8+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org)
[![Flask](https://img.shields.io/badge/Flask-2.x-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com)
[![PyTorch](https://img.shields.io/badge/PyTorch-Sentence--Transformers-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white)](https://sbert.net)
[![License](https://img.shields.io/badge/License-Educational-green.svg?style=for-the-badge)](#license)

---

### 👤 Author
**Aditya** | [GitHub Profile](https://github.com/adityawork365-commits)

</div>

---

## 🌟 Overview

**Resume-Hub** solves the high-volume screening challenge faced by recruiters and HR teams. Modern applicant tracking systems (ATS) often rely on strict keyword matching, which misses qualified candidates who phrase their experiences differently. 

Resume-Hub addresses this by using **Sentence-Transformers (`all-MiniLM-L6-v2`)** to convert both job descriptions and candidate resumes into 384-dimensional dense vector embeddings. By calculating cosine similarity between these semantic vectors, the platform accurately evaluates true capability and skill relevance.

---

## 📸 Application Interface

<div align="center">

### 1. Authentication Portal
Modern glassmorphism login interface with demo account integration.
![Login Screen](Screenshot%202026-08-09%20190242.png)

### 2. Job Description & Ingestion Portal
Supports multi-format uploading (PDF, DOCX, TXT, OCR for PNG/JPG) with real-time status tracking.
![Upload Screen](Screenshot%202026-08-09%20184335.png)

### 3. Real-Time Screening Dashboard
Ranked candidate profiles with match confidence scores, extracted skills, and categorization tiers.
![Results Dashboard](Screenshot%202026-08-09%20190237.png)

</div>

---

## ✨ Key Features

* 🧠 **Semantic AI Matching**: Uses `Sentence-BERT` for contextual semantic similarity beyond keyword matching.
* 📂 **Multi-Format Ingestion**: Native parsing for PDF, DOCX, TXT, plus **Tesseract OCR** engine for image resumes (PNG/JPG).
* 📊 **Interactive Scoring Tiers**: Categorizes applicants into score tiers:
  * 🟢 **Excellent**: $\ge 75\%$
  * 🔵 **Good**: $60\% - 74\%$
  * 🟡 **Moderate**: $45\% - 59\%$
  * 🔴 **Low**: $< 45\%$
* 🔍 **Automated Entity & Skill Extraction**: Uses `spaCy` and `NLTK` to extract core skill keywords from unstructured document text.
* 📈 **Analytics Export**: Single-click export of structured candidate ranking reports into standard CSV format.

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
