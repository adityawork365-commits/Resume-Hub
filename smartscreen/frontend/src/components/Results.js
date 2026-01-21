import React, { useState } from 'react';
import './Results.css';

function Results({ results, jobDescription, onBack, user, onLogout }) {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [filter, setFilter] = useState('all');

  const getFilteredResults = () => {
    if (filter === 'all') return results;
    if (filter === 'excellent') return results.filter(r => r.match_score >= 75);
    if (filter === 'good') return results.filter(r => r.match_score >= 60 && r.match_score < 75);
    if (filter === 'moderate') return results.filter(r => r.match_score >= 45 && r.match_score < 60);
    return results.filter(r => r.match_score < 45);
  };

  const getScoreColor = (score) => {
    if (score >= 75) return '#10b981';
    if (score >= 60) return '#3b82f6';
    if (score >= 45) return '#f59e0b';
    return '#ef4444';
  };

  const getScoreBadge = (score) => {
    if (score >= 75) return { text: 'Excellent', color: '#10b981' };
    if (score >= 60) return { text: 'Good', color: '#3b82f6' };
    if (score >= 45) return { text: 'Moderate', color: '#f59e0b' };
    return { text: 'Low', color: '#ef4444' };
  };

  const exportResults = () => {
    const csv = [
      ['Name', 'Email', 'Phone', 'Match Score', 'Skills', 'Experience', 'Explanation'],
      ...results.map(r => [
        r.name,
        r.email,
        r.phone,
        r.match_score,
        r.skills.join('; '),
        `${r.experience} years`,
        r.explanation
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'smartscreen-results.csv';
    a.click();
  };

  const filteredResults = getFilteredResults();

  return (
    <div className="results-container">
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
        <div className="header-actions">
          <button onClick={onBack} className="back-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            New Screening
          </button>
          <button onClick={onLogout} className="logout-btn">Logout</button>
        </div>
      </div>

      <div className="results-content">
        <div className="results-header">
          <div className="results-title">
            <h1>Screening Results</h1>
            <p>{results.length} candidates analyzed</p>
          </div>
          <button onClick={exportResults} className="export-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export CSV
          </button>
        </div>

        <div className="filter-bar">
          <button 
            className={filter === 'all' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilter('all')}
          >
            All ({results.length})
          </button>
          <button 
            className={filter === 'excellent' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilter('excellent')}
          >
            Excellent ({results.filter(r => r.match_score >= 75).length})
          </button>
          <button 
            className={filter === 'good' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilter('good')}
          >
            Good ({results.filter(r => r.match_score >= 60 && r.match_score < 75).length})
          </button>
          <button 
            className={filter === 'moderate' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilter('moderate')}
          >
            Moderate ({results.filter(r => r.match_score >= 45 && r.match_score < 60).length})
          </button>
          <button 
            className={filter === 'low' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilter('low')}
          >
            Low ({results.filter(r => r.match_score < 45).length})
          </button>
        </div>

        <div className="candidates-grid">
          {filteredResults.map((candidate, index) => {
            const badge = getScoreBadge(candidate.match_score);
            return (
              <div 
                key={index} 
                className="candidate-card"
                onClick={() => setSelectedCandidate(candidate)}
              >
                <div className="candidate-header">
                  <div className="candidate-avatar">
                    {candidate.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="candidate-info">
                    <h3>{candidate.name}</h3>
                    <p>{candidate.email}</p>
                  </div>
                  <div className="score-badge" style={{ background: badge.color }}>
                    {badge.text}
                  </div>
                </div>

                <div className="score-section">
                  <div className="score-label">Match Score</div>
                  <div className="score-bar-container">
                    <div 
                      className="score-bar"
                      style={{ 
                        width: `${candidate.match_score}%`,
                        background: getScoreColor(candidate.match_score)
                      }}
                    />
                  </div>
                  <div className="score-value">{candidate.match_score}%</div>
                </div>

                <div className="candidate-details">
                  <div className="detail-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>{candidate.experience} years experience</span>
                  </div>
                  <div className="detail-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>{candidate.filename}</span>
                  </div>
                </div>

                {candidate.skills.length > 0 && (
                  <div className="skills-section">
                    {candidate.skills.slice(0, 5).map((skill, i) => (
                      <span key={i} className="skill-tag">{skill}</span>
                    ))}
                    {candidate.skills.length > 5 && (
                      <span className="skill-tag">+{candidate.skills.length - 5}</span>
                    )}
                  </div>
                )}

                <div className="explanation">
                  {candidate.explanation}
                </div>
              </div>
            );
          })}
        </div>

        {filteredResults.length === 0 && (
          <div className="no-results">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>No candidates match this filter</p>
          </div>
        )}
      </div>

      {selectedCandidate && (
        <div className="modal-overlay" onClick={() => setSelectedCandidate(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedCandidate(null)}>×</button>
            <h2>{selectedCandidate.name}</h2>
            <div className="modal-details">
              <p><strong>Email:</strong> {selectedCandidate.email}</p>
              <p><strong>Phone:</strong> {selectedCandidate.phone || 'Not provided'}</p>
              <p><strong>Experience:</strong> {selectedCandidate.experience} years</p>
              <p><strong>Match Score:</strong> {selectedCandidate.match_score}%</p>
              <p><strong>File:</strong> {selectedCandidate.filename}</p>
              <div className="modal-skills">
                <strong>Skills:</strong>
                <div className="skills-list">
                  {selectedCandidate.skills.map((skill, i) => (
                    <span key={i} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
              <div className="modal-explanation">
                <strong>AI Analysis:</strong>
                <p>{selectedCandidate.explanation}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Results;