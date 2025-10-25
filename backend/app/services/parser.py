import os
import re
import pdfplumber
from docx import Document
from typing import Dict, List, Optional, Union
from pathlib import Path

# Common tech skills to detect
TECH_SKILLS = {
    'python', 'javascript', 'typescript', 'java', 'c++', 'c#', 'ruby', 'php',
    'react', 'angular', 'vue', 'node', 'express', 'django', 'flask', 'fastapi',
    'postgresql', 'mysql', 'mongodb', 'redis', 'elasticsearch',
    'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'terraform',
    'git', 'jenkins', 'circleci', 'github actions',
    'html', 'css', 'sass', 'webpack', 'babel'
}

def parse_resume(file_path: str) -> Dict[str, Union[bool, Dict, str, List[str], int]]:
    """
    Parse resume file (PDF or DOCX) and extract relevant information.
    
    Args:
        file_path (str): Path to the resume file
        
    Returns:
        Dict containing:
            - success (bool): Whether parsing was successful
            - personal (Dict): Personal information (name, email, phone)
            - raw_text (str): Full text content
            - skills (List[str]): Detected technical skills
            - word_count (int): Total word count
            - error (str, optional): Error message if parsing failed
    """
    try:
        # Get file extension
        file_ext = Path(file_path).suffix.lower()
        
        # Extract text based on file type
        if file_ext == '.pdf':
            text = _extract_pdf_text(file_path)
        elif file_ext in ['.docx', '.doc']:
            text = _extract_docx_text(file_path)
        else:
            return {
                "success": False,
                "error": "Unsupported file format. Please upload PDF or DOCX file."
            }

        # Extract information
        lines = text.split('\n')
        first_20_lines = '\n'.join(lines[:20])
        
        # Extract personal info
        name = lines[0].strip() if lines else ""
        email = _extract_email(text)
        phone = _extract_phone(text)
        
        # Extract skills
        skills = _extract_skills(text)
        
        # Calculate word count
        word_count = len(text.split())
        
        return {
            "success": True,
            "personal": {
                "name": name,
                "email": email,
                "phone": phone
            },
            "raw_text": text,
            "skills": sorted(list(skills)),
            "word_count": word_count
        }
        
    except Exception as e:
        return {
            "success": False,
            "error": f"Failed to parse resume: {str(e)}"
        }

def _extract_pdf_text(file_path: str) -> str:
    """Extract text from PDF file."""
    with pdfplumber.open(file_path) as pdf:
        return '\n'.join(page.extract_text() for page in pdf.pages)

def _extract_docx_text(file_path: str) -> str:
    """Extract text from DOCX file."""
    doc = Document(file_path)
    return '\n'.join(paragraph.text for paragraph in doc.paragraphs)

def _extract_email(text: str) -> Optional[str]:
    """Extract email address from text using regex."""
    email_pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
    match = re.search(email_pattern, text)
    return match.group(0) if match else None

def _extract_phone(text: str) -> Optional[str]:
    """Extract phone number from text using regex."""
    # Matches common US and international formats
    phone_pattern = r'''
        (?:\+\d{1,3}[-.\s]?)? # Optional country code
        (?:\(?\d{3}\)?[-.\s]?) # Area code
        \d{3}[-.\s]?\d{4} # Main number
        '''
    match = re.search(phone_pattern, text, re.VERBOSE)
    return match.group(0) if match else None

def _extract_skills(text: str) -> set:
    """Extract technical skills from text."""
    text_lower = text.lower()
    return {skill for skill in TECH_SKILLS if skill in text_lower}
