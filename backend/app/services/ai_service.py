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
