import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const login = async (email, password) => {
  const response = await axios.post(`${API_BASE_URL}/login`, {
    email,
    password
  });
  return response.data;
};

export const screenResumes = async (jobDescription, resumeFiles) => {
  const formData = new FormData();
  formData.append('jobDescription', jobDescription);
  
  resumeFiles.forEach((file) => {
    formData.append('resumes', file);
  });
  
  const response = await axios.post(`${API_BASE_URL}/screen`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  
  return response.data;
};