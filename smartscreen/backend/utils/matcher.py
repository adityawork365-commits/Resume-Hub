from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

class SemanticMatcher:
    def __init__(self):
        """Initialize the semantic matcher with a pre-trained model"""
        print("Loading sentence transformer model...")
        self.model = SentenceTransformer('all-MiniLM-L6-v2')
        print("Model loaded successfully!")
    
    def generate_embedding(self, text):
        """Generate semantic embedding for text"""
        return self.model.encode(text, convert_to_tensor=False)
    
    def calculate_similarity(self, resume_text, job_description):
        """Calculate semantic similarity between resume and job description"""
        resume_embedding = self.generate_embedding(resume_text)
        job_embedding = self.generate_embedding(job_description)
        
        # Reshape for cosine similarity
        resume_embedding = resume_embedding.reshape(1, -1)
        job_embedding = job_embedding.reshape(1, -1)
        
        similarity = cosine_similarity(resume_embedding, job_embedding)[0][0]
        return float(similarity)
    
    def match_resumes(self, resumes_data, job_description):
        """Match multiple resumes against job description"""
        results = []
        
        job_embedding = self.generate_embedding(job_description)
        
        for resume in resumes_data:
            resume_embedding = self.generate_embedding(resume['text'])
            
            # Calculate similarity
            resume_emb = resume_embedding.reshape(1, -1)
            job_emb = job_embedding.reshape(1, -1)
            similarity = cosine_similarity(resume_emb, job_emb)[0][0]
            
            # Calculate match percentage
            match_score = float(similarity * 100)
            
            results.append({
                'name': resume['name'],
                'email': resume['email'],
                'phone': resume['phone'],
                'filename': resume['filename'],
                'match_score': round(match_score, 2),
                'skills': resume['skills'],
                'experience': resume['experience'],
                'explanation': self._generate_explanation(match_score, resume['skills'], job_description)
            })
        
        # Sort by match score
        results.sort(key=lambda x: x['match_score'], reverse=True)
        
        return results
    
    def _generate_explanation(self, score, skills, job_description):
        """Generate explanation for the match"""
        if score >= 75:
            reason = "Excellent match"
        elif score >= 60:
            reason = "Good match"
        elif score >= 45:
            reason = "Moderate match"
        else:
            reason = "Low match"
        
        job_desc_lower = job_description.lower()
        matched_skills = [s for s in skills if s in job_desc_lower]
        
        if matched_skills:
            skills_str = ", ".join(matched_skills[:5])
            explanation = f"{reason}. Candidate has relevant skills: {skills_str}."
        else:
            explanation = f"{reason}. Consider reviewing candidate's overall profile."
        
        return explanation