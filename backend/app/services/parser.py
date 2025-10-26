import os
import re
import json
from docx import Document
import pdfplumber
from typing import Dict, Optional, Union
from pathlib import Path

from dotenv import load_dotenv
load_dotenv()

from groq import Groq

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def parse_resume(file_path: str) -> Dict[str, Union[bool, Dict, str, list, int]]:
    """
    Parse resume file (PDF or DOCX) using AI to extract personal info, skills, experience, projects, education.
    """
    try:
        file_ext = Path(file_path).suffix.lower()

        if file_ext == '.pdf':
            text = _extract_pdf_text(file_path)
        elif file_ext in ['.docx', '.doc']:
            text = _extract_docx_text(file_path)
        else:
            return {
                "success": False,
                "error": "Unsupported file format. Please upload PDF or DOCX file."
            }

        result = groq_parse_resume(text)

        # Normalize keys to ensure arrays exist
        for k in ['work_experience', 'projects', 'education', 'skills']:
            if k not in result or not isinstance(result[k], list):
                result[k] = []

        if "error" in result:
            return {
                "success": False,
                "error": result["error"],
                "output": result.get("output", ""),
                "raw_text": text
            }

        result["success"] = True
        result["raw_text"] = text
        result["word_count"] = len(text.split())
        return result

    except Exception as e:
        return {
            "success": False,
            "error": f"Failed to parse resume: {str(e)}"
        }

def _extract_pdf_text(file_path: str) -> str:
    with pdfplumber.open(file_path) as pdf:
        return '\n'.join(page.extract_text() or '' for page in pdf.pages)

def _extract_docx_text(file_path: str) -> str:
    doc = Document(file_path)
    return '\n'.join(paragraph.text for paragraph in doc.paragraphs)

def groq_parse_resume(resume_text: str) -> dict:
    """
    Use Groq LLM to extract structured JSON data from resume text.
    """
    prompt = f"""
Given the following resume text, extract the following strictly as valid JSON (no markdown, no explanation):

- personal: {{name, email, phone, location}}
- skills: array of strings
- work_experience: array of objects with employer, job_title, start_date, end_date, description
- projects: array of objects with title, description, tech_stack, year
- education: array of objects with institution, degree, start_date, end_date, major, gpa

Include empty arrays if sections are missing.

Return ONLY JSON between <START> and <END> markers.

<START>
{{
  "personal": {{"name": "...", "email": "...", "phone": "...", "location": "..."}},
  "skills": ["..."],
  "work_experience": [{{"employer": "...", "job_title": "...", "start_date": "...", "end_date": "...", "description": "..."}}],
  "projects": [{{"title": "...", "description": "...", "tech_stack": "...", "year": "..."}}],
  "education": [{{"institution": "...", "degree": "...", "start_date": "...", "end_date": "...", "major": "...", "gpa": "..."}}]
}}
<END>

Resume Text:
{resume_text}

Output only the JSON between <START> and <END>.
"""

    try:
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=700,
            temperature=0.1,
        )
        ai_text = response.choices[0].message.content
        match = re.search(r'<START>([\s\S]*?)<END>', ai_text)
        if match:
            extracted_json = match.group(1).strip()
            try:
                return json.loads(extracted_json)
            except json.JSONDecodeError:
                return {"error": "AI returned invalid JSON", "output": extracted_json}
        else:
            return {"error": "AI did not return JSON between expected markers", "output": ai_text}
    except Exception as e:
        return {"error": f"Groq API call failed: {str(e)}"}
