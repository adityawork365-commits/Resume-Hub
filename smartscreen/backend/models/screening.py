from utils.parser import ResumeParser
from utils.preprocessor import TextPreprocessor
from utils.matcher import SemanticMatcher

class ScreeningEngine:
    def __init__(self):
        self.parser = ResumeParser()
        self.preprocessor = TextPreprocessor()
        self.matcher = SemanticMatcher()
    
    def process_resume(self, file_path, filename):
        """Process a single resume file"""
        # Extract text
        raw_text = self.parser.extract_text(file_path)
        
        if not raw_text:
            return None
        
        # Extract information
        name = self.parser.extract_name(raw_text)
        contact_info = self.parser.extract_contact_info(raw_text)
        
        # Clean text for matching
        cleaned_text = self.preprocessor.clean_text(raw_text)
        
        # Extract skills and experience
        skills = self.preprocessor.extract_keywords(raw_text)
        experience = self.preprocessor.calculate_experience(raw_text)
        
        return {
            'name': name,
            'email': contact_info['email'],
            'phone': contact_info['phone'],
            'filename': filename,
            'text': cleaned_text,
            'raw_text': raw_text[:500],  # First 500 chars for preview
            'skills': skills,
            'experience': experience
        }
    
    def screen_candidates(self, resume_files, job_description):
        """Screen multiple candidates against job description"""
        resumes_data = []
        
        # Process all resumes
        for file_path, filename in resume_files:
            resume_data = self.process_resume(file_path, filename)
            if resume_data:
                resumes_data.append(resume_data)
        
        # Match resumes with job description
        if not resumes_data:
            return []
        
        results = self.matcher.match_resumes(resumes_data, job_description)
        
        return results