import PyPDF2
from docx import Document
import pytesseract
from PIL import Image
import os
import re

class ResumeParser:
    @staticmethod
    def extract_text(file_path):
        """Extract text from various file formats"""
        ext = os.path.splitext(file_path)[1].lower()
        
        try:
            if ext == '.pdf':
                return ResumeParser._extract_from_pdf(file_path)
            elif ext == '.docx':
                return ResumeParser._extract_from_docx(file_path)
            elif ext == '.txt':
                return ResumeParser._extract_from_txt(file_path)
            elif ext in ['.png', '.jpg', '.jpeg']:
                return ResumeParser._extract_from_image(file_path)
            else:
                return ""
        except Exception as e:
            print(f"Error parsing {file_path}: {str(e)}")
            return ""
    
    @staticmethod
    def _extract_from_pdf(file_path):
        """Extract text from PDF"""
        text = ""
        try:
            with open(file_path, 'rb') as file:
                pdf_reader = PyPDF2.PdfReader(file)
                for page in pdf_reader.pages:
                    text += page.extract_text()
        except:
            pass
        return text
    
    @staticmethod
    def _extract_from_docx(file_path):
        """Extract text from DOCX"""
        try:
            doc = Document(file_path)
            text = "\n".join([paragraph.text for paragraph in doc.paragraphs])
            return text
        except:
            return ""
    
    @staticmethod
    def _extract_from_txt(file_path):
        """Extract text from TXT"""
        try:
            with open(file_path, 'r', encoding='utf-8') as file:
                return file.read()
        except:
            return ""
    
    @staticmethod
    def _extract_from_image(file_path):
        """Extract text from image using OCR"""
        try:
            image = Image.open(file_path)
            text = pytesseract.image_to_string(image)
            return text
        except:
            return ""
    
    @staticmethod
    def extract_contact_info(text):
        """Extract email and phone from text"""
        email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
        phone_pattern = r'(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}'
        
        emails = re.findall(email_pattern, text)
        phones = re.findall(phone_pattern, text)
        
        return {
            'email': emails[0] if emails else '',
            'phone': phones[0] if phones else ''
        }
    
    @staticmethod
    def extract_name(text):
        """Simple name extraction - first line typically contains name"""
        lines = text.strip().split('\n')
        for line in lines:
            line = line.strip()
            if len(line) > 2 and len(line) < 50:
                # Remove common titles
                line = re.sub(r'\b(Mr|Ms|Mrs|Dr|Prof)\.?\s*', '', line, flags=re.IGNORECASE)
                if line and not any(char.isdigit() for char in line):
                    return line
        return "Unknown"