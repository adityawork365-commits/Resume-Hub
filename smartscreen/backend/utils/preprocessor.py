import re
import string

class TextPreprocessor:
    @staticmethod
    def clean_text(text):
        """Clean and normalize text"""
        if not text:
            return ""
        
        # Convert to lowercase
        text = text.lower()
        
        # Remove URLs
        text = re.sub(r'http\S+|www.\S+', '', text)
        
        # Remove email addresses for processing (but keep for extraction)
        text = re.sub(r'\S+@\S+', '', text)
        
        # Remove special characters but keep spaces
        text = re.sub(r'[^a-zA-Z0-9\s]', ' ', text)
        
        # Remove extra whitespace
        text = ' '.join(text.split())
        
        return text
    
    @staticmethod
    def extract_keywords(text):
        """Extract important keywords from text"""
        # Common skill keywords to look for
        common_skills = [
            'python', 'java', 'javascript', 'react', 'node', 'sql', 'mongodb',
            'machine learning', 'deep learning', 'ai', 'data science',
            'project management', 'leadership', 'communication', 'teamwork',
            'agile', 'scrum', 'git', 'docker', 'kubernetes', 'aws', 'azure',
            'html', 'css', 'typescript', 'angular', 'vue', 'django', 'flask',
            'postgresql', 'mysql', 'redis', 'elasticsearch', 'tensorflow',
            'pytorch', 'scikit-learn', 'pandas', 'numpy', 'nlp', 'computer vision'
        ]
        
        text_lower = text.lower()
        found_skills = []
        
        for skill in common_skills:
            if skill in text_lower:
                found_skills.append(skill)
        
        return found_skills
    
    @staticmethod
    def calculate_experience(text):
        """Estimate years of experience from text"""
        # Look for patterns like "5 years", "3+ years", etc.
        experience_patterns = [
            r'(\d+)\+?\s*years?',
            r'(\d+)\+?\s*yrs?',
        ]
        
        max_years = 0
        for pattern in experience_patterns:
            matches = re.findall(pattern, text.lower())
            for match in matches:
                years = int(match)
                max_years = max(max_years, years)
        
        return max_years