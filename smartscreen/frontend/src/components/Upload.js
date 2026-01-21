import React, { useState } from 'react';
import { screenResumes } from '../utils/api';
import './Upload.css';

function Upload({ user, onLogout, onResults }) {
  const [jobDescription, setJobDescription] = useState('');
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    setError('');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(droppedFiles);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!jobDescription.trim()) {
      setError('Please enter a job description');
      return;
    }

    if (files.length === 0) {
      setError('Please upload at least one resume');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await screenResumes(jobDescription, files);
      if (response.success) {
        onResults(response.results, jobDescription);
      } else {
        setError('Screening failed. Please try again.');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred during screening');
    } finally {
      setLoading(false);
    }
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="upload-container">
      <div className="header">
        <div className="header-left">
          <div className="logo-small">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h2>ResumeHub</h2>
            <p className="user-info">Welcome, {user.name}</p>
          </div>
        </div>
        <button onClick={onLogout} className="logout-btn">Logout</button>
      </div>

      <div className="upload-card">
        <div className="step-indicator">
          <div className="step active">
            <div className="step-number">1</div>
            <div className="step-text">Job Description</div>
          </div>
          <div className="step-line"></div>
          <div className="step active">
            <div className="step-number">2</div>
            <div className="step-text">Upload Resumes</div>
          </div>
          <div className="step-line"></div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-text">AI Analysis</div>
          </div>
          <div className="step-line"></div>
          <div className="step">
            <div className="step-number">4</div>
            <div className="step-text">Results</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="upload-form">
          <div className="form-section">
            <label className="section-label">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Job Description
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here... Include requirements, skills needed, responsibilities, etc."
              rows="8"
              required
            />
          </div>

          <div className="form-section">
            <label className="section-label">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Upload Resumes
            </label>
            
            <div 
              className="dropzone"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => document.getElementById('file-input').click()}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="dropzone-text">Drag & drop resumes here or click to browse</p>
              <p className="dropzone-subtext">Supports PDF, DOCX, TXT, PNG, JPG (Max 16MB)</p>
              <input
                id="file-input"
                type="file"
                multiple
                accept=".pdf,.docx,.txt,.png,.jpg,.jpeg"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
            </div>

            {files.length > 0 && (
              <div className="file-list">
                {files.map((file, index) => (
                  <div key={index} className="file-item">
                    <div className="file-info">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>{file.name}</span>
                      <span className="file-size">({(file.size / 1024).toFixed(1)} KB)</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="remove-btn"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="screen-button" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner"></span>
                Analyzing Resumes...
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Start AI Screening
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Upload;