from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api.routes import router
import os
from pathlib import Path

# Initialize FastAPI application with metadata
app = FastAPI(
    title="PortfolioAI API",
    description="AI-powered portfolio generator backend",
    version="1.0.0"
)

# Configure CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Include API router
app.include_router(router, prefix="/api")

@app.on_event("startup")
async def startup_event():
    """
    Startup event handler that runs when the application starts.
    Creates required directories and prints startup message.
    """
    # Create uploads directory if it doesn't exist
    uploads_dir = Path("uploads")
    uploads_dir.mkdir(exist_ok=True)
    
    print("🚀 PortfolioAI API started successfully")
    print(f"📁 Uploads directory: {uploads_dir.absolute()}")

@app.get("/")
async def root():
    """
    Root endpoint that returns basic API information.
    """
    return {
        "message": "PortfolioAI API",
        "version": "1.0.0", 
        "docs": "/docs"
    }
