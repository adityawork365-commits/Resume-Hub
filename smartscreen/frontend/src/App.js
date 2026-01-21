import React, { useState } from 'react';
import Login from './components/Login';
import Upload from './components/Upload';
import Results from './components/Results';

function App() {
  const [user, setUser] = useState(null);
  const [results, setResults] = useState(null);
  const [jobDescription, setJobDescription] = useState('');

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setResults(null);
    setJobDescription('');
  };

  const handleResults = (resultsData, jd) => {
    setResults(resultsData);
    setJobDescription(jd);
  };

  const handleBack = () => {
    setResults(null);
    setJobDescription('');
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  if (results) {
    return (
      <Results 
        results={results} 
        jobDescription={jobDescription}
        onBack={handleBack}
        user={user}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <Upload 
      user={user} 
      onLogout={handleLogout}
      onResults={handleResults}
    />
  );
}

export default App;