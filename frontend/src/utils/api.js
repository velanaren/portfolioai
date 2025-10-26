// API configuration
const API_BASE_URL = 'http://localhost:8000/api';

/**
 * Upload resume file and get parsed data
 * @param {File} file - Resume file (PDF, DOCX, TXT)
 * @returns {Promise<Object>} Parsed resume data
 */
export async function uploadResume(file) {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/upload-resume`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Upload failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
}

/**
 * Check if API is healthy
 * @returns {Promise<Object>} Health status
 */
export async function checkHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Health check error:', error);
    throw error;
  }
}

/**
 * Generate AI bio from resume data using Groq
 * @param {Object} resumeData - Resume data object
 * @returns {Promise<Object>} Generated bio
 */
export async function generateBio(resumeData) {
  try {
    const response = await fetch(`${API_BASE_URL}/generate-bio`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resumeData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to generate bio');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Bio generation error:', error);
    throw error;
  }
}

export async function generateCoverLetter(portfolioData, jobDescription) {
  try {
    const response = await fetch(`${API_BASE_URL}/generate-cover-letter`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ portfolioData, jobDescription }),
    });
    if (!response.ok) throw new Error("Failed to generate cover letter");
    return await response.json();
  } catch (error) {
    throw error;
  }
}
