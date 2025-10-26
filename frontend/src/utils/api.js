const API_BASE_URL = 'http://localhost:8000/api';

/**
* Upload resume file and get parsed data
* @param {File} file - Resume file (PDF, DOCX, TXT)
* @returns {Promise} Parsed resume data
*/
export async function uploadResume(file) {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/upload-resume`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();  // always parse!

    if (!response.ok) {
      throw new Error(data.detail || data.error || 'Upload failed');
    }

    return data; // full object with .data field
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
}

/**
* Check if API is healthy
* @returns {Promise} Health status
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
* @returns {Promise} Generated bio
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

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || data.error || 'Failed to generate bio');
    }

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

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Failed to generate cover letter");
    return data;
  } catch (error) {
    throw error;
  }
}

export async function generateWorkExperienceDescription(workExpData) {
  try {
    const response = await fetch(`${API_BASE_URL}/generate-work-experience-description`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(workExpData),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Failed to generate work experience description");
    return data;
  } catch (error) {
    console.error("Work experience generation error:", error);
    throw error;
  }
}

export async function generateProjectDescription(projectData) {
  try {
    const response = await fetch(`${API_BASE_URL}/generate-project-description`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(projectData),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Failed to generate project description");
    return data;
  } catch (error) {
    console.error("Project description generation error:", error);
    throw error;
  }
}