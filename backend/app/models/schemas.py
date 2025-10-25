from pydantic import BaseModel
from typing import Optional, List

class PersonalInfo(BaseModel):
    """
    Schema for personal information extracted from resume.
    Contains basic contact and location details.
    """
    name: str
    email: Optional[str] = None  
    phone: Optional[str] = None
    location: Optional[str] = None

class ResumeData(BaseModel):
    """
    Schema for processed resume data.
    Contains personal info, raw text content, extracted skills and word count.
    """
    personal: PersonalInfo
    raw_text: str
    skills: List[str]
    word_count: int

class ParseResponse(BaseModel):
    """
    Schema for resume parsing API response.
    Contains success status, optional resume data, error message and status message.
    """
    success: bool
    data: Optional[ResumeData] = None
    error: Optional[str] = None 
    message: Optional[str] = None

class HealthResponse(BaseModel):
    """
    Schema for API health check response.
    Contains service status and message.
    """
    status: str
    message: str
