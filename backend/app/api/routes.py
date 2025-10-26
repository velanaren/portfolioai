from fastapi import APIRouter, UploadFile, File, HTTPException
import os
import shutil
from uuid import uuid4
from ..services.parser import parse_resume
from ..models.schemas import ParseResponse, HealthResponse
from ..services.ai_service import generate_bio



router = APIRouter()

# Maximum file size (5MB)
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB in bytes
ALLOWED_EXTENSIONS = {'.pdf', '.docx'}

@router.get("/health", response_model=HealthResponse)
async def health_check():
    """
    Health check endpoint to verify API status.
    Returns basic health status and message.
    """
    return HealthResponse(
        status="healthy",
        message="Service is running normally"
    )

@router.post("/upload-resume", response_model=ParseResponse)
async def upload_resume(file: UploadFile = File(...)):
    """
    Upload and parse resume file endpoint.
    Accepts PDF or DOCX files up to 5MB, processes content and returns structured data.
    """
    try:
        # Validate file extension
        file_ext = os.path.splitext(file.filename)[1].lower()
        if file_ext not in ALLOWED_EXTENSIONS:
            raise HTTPException(
                status_code=400,
                detail="Invalid file type. Only PDF and DOCX files are allowed."
            )

        # Validate file size
        file_size = 0
        file_contents = await file.read()
        file_size = len(file_contents)
        
        if file_size > MAX_FILE_SIZE:
            raise HTTPException(
                status_code=400,
                detail="File too large. Maximum size is 5MB."
            )

        # Create uploads directory if it doesn't exist
        os.makedirs("uploads", exist_ok=True)

        # Generate unique filename
        unique_filename = f"uploads/{uuid4()}{file_ext}"

        # Save file temporarily
        with open(unique_filename, "wb") as buffer:
            buffer.write(file_contents)

        # Parse resume
        result = parse_resume(unique_filename)

        # Delete temporary file
        os.remove(unique_filename)

        if not result["success"]:
            raise HTTPException(
                status_code=422,
                detail=result["error"]
            )

        # Construct response
        return ParseResponse(
            success=True,
            data=result,
            message="Resume parsed successfully"
        )

    except HTTPException as he:
        # Re-raise HTTP exceptions
        raise he

    except Exception as e:
        # Handle unexpected errors
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred while processing the file: {str(e)}"
        )

    finally:
        # Ensure temporary file is deleted in case of errors
        if 'unique_filename' in locals() and os.path.exists(unique_filename):
            os.remove(unique_filename)

@router.post("/generate-bio")
async def generate_bio_endpoint(resume_data: dict):
    """
    Generate professional bio using Groq AI.
    Free tier: 14,400 requests/day
    """
    try:
        bio = generate_bio(resume_data)
        return {
            "success": True,
            "bio": bio,
            "message": "Bio generated successfully"
        }
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate bio: {str(e)}"
        )
