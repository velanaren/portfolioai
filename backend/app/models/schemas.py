from pydantic import BaseModel
from typing import Optional, List

class PersonalInfo(BaseModel):
    name: Optional[str] = ""
    email: Optional[str] = ""
    phone: Optional[str] = ""
    location: Optional[str] = ""

class WorkExperience(BaseModel):
    employer: Optional[str] = ""
    job_title: Optional[str] = ""
    start_date: Optional[str] = ""
    end_date: Optional[str] = ""
    description: Optional[str] = ""

class Project(BaseModel):
    title: Optional[str] = ""
    description: Optional[str] = ""
    tech_stack: Optional[str] = ""
    year: Optional[str] = ""

class Education(BaseModel):
    institution: Optional[str] = ""
    degree: Optional[str] = ""
    start_date: Optional[str] = ""
    end_date: Optional[str] = ""
    major: Optional[str] = ""
    gpa: Optional[str] = ""

class ResumeData(BaseModel):
    personal: PersonalInfo
    raw_text: str
    skills: List[str]
    work_experience: List[WorkExperience] = []
    projects: List[Project] = []
    education: List[Education] = []
    word_count: int

class ParseResponse(BaseModel):
    success: bool
    data: Optional[ResumeData] = None
    error: Optional[str] = None 
    message: Optional[str] = None

class HealthResponse(BaseModel):
    status: str
    message: str
