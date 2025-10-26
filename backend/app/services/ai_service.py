from groq import Groq
import os
from typing import Dict
from dotenv import load_dotenv
load_dotenv()


# Initialize Groq client with API key
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def generate_bio(resume_data: Dict) -> str:
    """
    Generate professional bio using Groq AI (free tier).
    Uses Llama 3.1 model - fast and high quality.
    """
    try:
        # Extract data
        personal = resume_data.get('personal', {})
        name = personal.get('name', 'Professional')
        skills = resume_data.get('skills', [])
        raw_text = resume_data.get('raw_text', '')
        
        # Get top 5 skills
        top_skills = ', '.join(skills[:5]) if skills else 'various technologies'
        
        # Create prompt
        prompt = f"""Write a compelling professional bio (2-3 sentences) for {name}'s portfolio.

Context from their resume: {raw_text[:300]}

Key skills: {top_skills}

Requirements:
- Professional and confident tone
- 2-3 sentences only
- Highlight expertise and passion
- Suitable for portfolio website
- No bullet points, just flowing text"""

        # Call Groq API
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",  # Fast, free model
            messages=[
                {
                    "role": "system",
                    "content": "You are a professional career writer specializing in portfolio bios."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            max_tokens=200,
            temperature=0.7,  # Creative but controlled
        )
        
        # Extract generated bio
        bio = response.choices[0].message.content.strip()
        
        # Remove quotes if present
        bio = bio.strip('"').strip("'")
        
        return bio
        
    except Exception as e:
        print(f"Groq API error: {str(e)}")
        # Fallback to template-based bio
        return fallback_bio(resume_data)


def fallback_bio(resume_data: Dict) -> str:
    """
    Fallback template-based bio if API fails.
    """
    personal = resume_data.get('personal', {})
    name = personal.get('name', 'Professional')
    skills = resume_data.get('skills', [])
    
    top_skills = ', '.join(skills[:3]) if len(skills) >= 3 else 'modern technologies'
    
    return f"{name} is an experienced professional specializing in {top_skills}. Passionate about delivering high-quality solutions and staying current with industry best practices. Known for problem-solving abilities and collaborative approach to development."


def enhance_experience(experience_text: str) -> str:
    """
    Enhance experience description using AI.
    Optional - can be implemented later.
    """
    if not experience_text or len(experience_text) < 10:
        return "Led development initiatives and delivered high-quality solutions."
    
    return experience_text.strip()


def generate_work_experience_desc(job_title: str, employer: str, description: str) -> str:
    """
    Generate a clear work experience description using AI.
    """
    try:
        prompt = f"""
You are a professional career content writer. Given a work experience entry, rewrite the description to be clear, impactful, and professional.

Job Title: {job_title}
Employer: {employer}
Current Description: {description}

Rewrite the description clearly and concisely, highlighting achievements and responsibilities. Use bullet points or paragraphs as appropriate.
"""
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": "You write clear, professional work experience descriptions."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=300,
            temperature=0.7,
        )
        generated_desc = response.choices[0].message.content.strip()
        generated_desc = generated_desc.strip('"').strip("'")
        return generated_desc
    except Exception as e:
        print(f"Groq API error on work experience description: {str(e)}")
        return description or "Led development initiatives and delivered high-quality solutions."


def generate_project_desc(title: str, year: str, tech_stack: str, description: str) -> str:
    """
    Generate project description using STAR format using AI.
    """
    try:
        prompt = f"""
You are a professional career writer skilled in STAR format. Given project details, write a project description in the STAR format (Situation, Task, Action, Result).

Project Title: {title}
Year: {year}
Tech Stack: {tech_stack}
Description: {description}

Write a STAR format description emphasizing impact and results. Use clear sections for Situation, Task, Action, and Result.
"""
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": "You generate project descriptions in STAR format."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=400,
            temperature=0.7,
        )
        generated_desc = response.choices[0].message.content.strip()
        generated_desc = generated_desc.strip('"').strip("'")
        return generated_desc
    except Exception as e:
        print(f"Groq API error on project description: {str(e)}")
        return description or "Developed and delivered a successful project."

        
def generate_cover_letter(portfolio_data: Dict, job_description: str) -> str:
    """
    Generate customized cover letter using Groq AI.
    """
    try:
        name = portfolio_data.get("personal", {}).get("name", "Candidate")
        skills = ", ".join(portfolio_data.get("skills", [])[:5])
        bio = portfolio_data.get("raw_text", "")
        prompt = f"""
Write a personalized cover letter for the following position:
{job_description}

Applicant: {name}
Key skills: {skills}
Bio/expertise: {bio[:250]}

Instructions:
- Address the job requirements clearly
- Show enthusiasm for the role
- Highlight matching experience, skills, and culture fit
- 3 paragraphs (max 400 words), professional tone
- No bullet points
"""
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": "You are an expert cover letter writer."},
                {"role": "user", "content": prompt},
            ],
            max_tokens=400,
            temperature=0.7,
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        return f"Dear Hiring Manager,\n\nI am excited to apply for this opportunity. My skills and background make me a strong fit. I look forward to contributing to your team.\n\nBest regards,\n{name}"
