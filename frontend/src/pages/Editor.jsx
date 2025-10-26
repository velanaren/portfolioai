import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import MinimalTemplate from '../components/templates/MinimalTemplate';
import ModernTemplate from '../components/templates/ModernTemplate';
import { generateBio, generateWorkExperienceDescription, generateProjectDescription } from '../utils/api';
import { exportAsHTML } from '../utils/export';

export default function Editor() {
  const location = useLocation();
  const navigate = useNavigate();
  const { templateName, resumeData } = location.state || {};

  if (!resumeData) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">No Resume Data Found</h2>
        <p className="text-gray-600 mb-8">Please upload your resume first to continue.</p>
        <Button onClick={() => navigate('/')}>
          Go to Home
        </Button>
      </div>
    );
  }

  // Ensure all arrays always exist
  const [editedData, setEditedData] = useState({
    ...resumeData,
    skills: Array.isArray(resumeData.skills) ? resumeData.skills : [],
    work_experience: Array.isArray(resumeData.work_experience) ? resumeData.work_experience : [],
    projects: Array.isArray(resumeData.projects) ? resumeData.projects : [],
    education: Array.isArray(resumeData.education) ? resumeData.education : []
  });

  const [generatingBio, setGeneratingBio] = useState(false);
  const [generatingWorkExpIndex, setGeneratingWorkExpIndex] = useState(null);
  const [generatingProjectIndex, setGeneratingProjectIndex] = useState(null);

  const [activeTemplate] = useState(templateName);
  const [skills, setSkills] = useState(editedData.skills || []);
  const [newSkill, setNewSkill] = useState('');

  // Personal info
  const handleInputChange = (field, value) => {
    setEditedData({
      ...editedData,
      personal: {
        ...editedData.personal,
        [field]: value
      }
    });
  };

  // AI Bio generator
  const handleGenerateBio = async () => {
    try {
      setGeneratingBio(true);
      const result = await generateBio(editedData);
      if (result.success) {
        setEditedData({
          ...editedData,
          raw_text: result.bio
        });
      }
    } catch (error) {
      console.error('Failed to generate bio:', error);
    } finally {
      setGeneratingBio(false);
    }
  };

  // Skills handlers
  const handleAddSkill = () => {
    if (!newSkill.trim()) return;
    if (skills.some(skill => skill.toLowerCase() === newSkill.trim().toLowerCase())) return;
    const updatedSkills = [...skills, newSkill.trim()];
    setSkills(updatedSkills);
    setEditedData({ ...editedData, skills: updatedSkills });
    setNewSkill('');
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
    setEditedData({ ...editedData, skills: updatedSkills });
  };

  // Experience handlers
  const handleExperienceChange = (idx, field, value) => {
    const updated = [...editedData.work_experience];
    updated[idx][field] = value;
    setEditedData({ ...editedData, work_experience: updated });
  };

  // Project handlers
  const handleProjectChange = (idx, field, value) => {
    const updated = [...editedData.projects];
    updated[idx][field] = value;
    setEditedData({ ...editedData, projects: updated });
  };

  // Education handlers
  const handleEducationChange = (idx, field, value) => {
    const updated = [...editedData.education];
    updated[idx][field] = value;
    setEditedData({ ...editedData, education: updated });
  };

  // Generate AI for specific work experience description
  const handleGenerateWorkExp = async (idx) => {
    try {
      setGeneratingWorkExpIndex(idx);
      const workExp = editedData.work_experience[idx];
      const context = {
        job_title: workExp.job_title,
        employer: workExp.employer,
        description: workExp.description
      };
      const result = await generateWorkExperienceDescription(context);
      if (result.success) {
        const updated = [...editedData.work_experience];
        updated[idx].description = result.description;
        setEditedData({ ...editedData, work_experience: updated });
      }
    } catch (error) {
      console.error('Failed to generate work experience description:', error);
    } finally {
      setGeneratingWorkExpIndex(null);
    }
  };

  // Generate AI for specific project description in STAR format
  const handleGenerateProjectDesc = async (idx) => {
    try {
      setGeneratingProjectIndex(idx);
      const project = editedData.projects[idx];
      const context = {
        title: project.title,
        year: project.year,
        tech_stack: project.tech_stack,
        description: project.description
      };
      const result = await generateProjectDescription(context);
      if (result.success) {
        const updated = [...editedData.projects];
        updated[idx].description = result.description;
        setEditedData({ ...editedData, projects: updated });
      }
    } catch (error) {
      console.error('Failed to generate project description:', error);
    } finally {
      setGeneratingProjectIndex(null);
    }
  };

  const handleExport = () => {
    exportAsHTML(activeTemplate, editedData);
  };

  const handleContinue = () => {
    navigate('/cover-letter', {
      state: { portfolioData: editedData }
    });
  };

  return (
    <div className="flex h-screen relative">
      {/* Sidebar */}
      <div className="w-1/3 bg-white border-r overflow-y-auto p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Edit Portfolio</h1>
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            {activeTemplate} template
          </span>
        </div>

        {/* Personal Information */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={editedData.personal?.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={editedData.personal?.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
            <input
              type="tel"
              placeholder="Phone"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={editedData.personal?.phone || ''}
              onChange={(e) => handleInputChange('phone', e.target.value)}
            />
          </div>
        </div>

        {/* Professional Bio */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Professional Bio</h2>
          <textarea
            rows={6}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2"
            value={editedData.raw_text || ''}
            onChange={(e) => setEditedData({ ...editedData, raw_text: e.target.value })}
          />
          <Button
            variant="secondary"
            size="small"
            onClick={handleGenerateBio}
            disabled={generatingBio}
          >
            {generatingBio ? (
              <span className="flex items-center">
                <LoadingSpinner className="w-4 h-4 mr-2" />
                Generating...
              </span>
            ) : (
              '✨ Generate with AI'
            )}
          </Button>
        </div>

        {/* Skills */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="bg-gray-100 px-3 py-1 rounded-full flex items-center"
              >
                {skill}
                <button
                  onClick={() => handleRemoveSkill(index)}
                  className="ml-2 text-gray-500 hover:text-red-500"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="flex mt-2 gap-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add a skill"
              className="border px-2 py-1 rounded"
            />
            <Button onClick={handleAddSkill} type="button">
              Add
            </Button>
          </div>
        </div>

        {/* Work Experience */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Work Experience</h2>
          {editedData.work_experience.length > 0
            ? editedData.work_experience.map((item, idx) => (
              <div key={idx} className="mb-4 p-4 bg-gray-50 rounded">
                <input
                  type="text"
                  value={item.job_title}
                  placeholder="Job Title"
                  onChange={e => handleExperienceChange(idx, 'job_title', e.target.value)}
                  className="mb-2 w-full border rounded p-1"
                />
                <input
                  type="text"
                  value={item.employer}
                  placeholder="Employer"
                  onChange={e => handleExperienceChange(idx, 'employer', e.target.value)}
                  className="mb-2 w-full border rounded p-1"
                />
                <input
                  type="text"
                  value={item.start_date}
                  placeholder="Start Date"
                  onChange={e => handleExperienceChange(idx, 'start_date', e.target.value)}
                  className="mb-2 w-full border rounded p-1"
                />
                <input
                  type="text"
                  value={item.end_date}
                  placeholder="End Date"
                  onChange={e => handleExperienceChange(idx, 'end_date', e.target.value)}
                  className="mb-2 w-full border rounded p-1"
                />
                <textarea
                  value={item.description}
                  placeholder="Description"
                  rows={2}
                  onChange={e => handleExperienceChange(idx, 'description', e.target.value)}
                  className="w-full border rounded p-1"
                />
                <Button
                  variant="secondary"
                  size="small"
                  onClick={() => handleGenerateWorkExp(idx)}
                  disabled={generatingWorkExpIndex === idx}
                  className="mt-2"
                >
                  {generatingWorkExpIndex === idx ? (
                    <span className="flex items-center">
                      <LoadingSpinner className="w-4 h-4 mr-2" />
                      Generating...
                    </span>
                  ) : (
                    '✨ Generate with AI'
                  )}
                </Button>
              </div>
            )) : <p className="text-gray-500">No experience found.</p>
          }
        </div>

        {/* Projects */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Projects</h2>
          {editedData.projects.length > 0
            ? editedData.projects.map((proj, idx) => (
              <div key={idx} className="mb-4 p-4 bg-gray-50 rounded">
                <input
                  type="text"
                  value={proj.title}
                  placeholder="Title"
                  onChange={e => handleProjectChange(idx, 'title', e.target.value)}
                  className="mb-2 w-full border rounded p-1"
                />
                <input
                  type="text"
                  value={proj.year}
                  placeholder="Year"
                  onChange={e => handleProjectChange(idx, 'year', e.target.value)}
                  className="mb-2 w-full border rounded p-1"
                />
                <input
                  type="text"
                  value={proj.tech_stack}
                  placeholder="Tech Stack"
                  onChange={e => handleProjectChange(idx, 'tech_stack', e.target.value)}
                  className="mb-2 w-full border rounded p-1"
                />
                <textarea
                  value={proj.description}
                  placeholder="Description"
                  rows={2}
                  onChange={e => handleProjectChange(idx, 'description', e.target.value)}
                  className="w-full border rounded p-1"
                />
                <Button
                  variant="secondary"
                  size="small"
                  onClick={() => handleGenerateProjectDesc(idx)}
                  disabled={generatingProjectIndex === idx}
                  className="mt-2"
                >
                  {generatingProjectIndex === idx ? (
                    <span className="flex items-center">
                      <LoadingSpinner className="w-4 h-4 mr-2" />
                      Generating...
                    </span>
                  ) : (
                    '✨ Generate with AI'
                  )}
                </Button>
              </div>
            )) : <p className="text-gray-500">No projects found.</p>
          }
        </div>

        {/* Education */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Education</h2>
          {editedData.education.length > 0
            ? editedData.education.map((edu, idx) => (
              <div key={idx} className="mb-4 p-4 bg-gray-50 rounded">
                <input
                  type="text"
                  value={edu.institution}
                  placeholder="Institution"
                  onChange={e => handleEducationChange(idx, 'institution', e.target.value)}
                  className="mb-2 w-full border rounded p-1"
                />
                <input
                  type="text"
                  value={edu.degree}
                  placeholder="Degree"
                  onChange={e => handleEducationChange(idx, 'degree', e.target.value)}
                  className="mb-2 w-full border rounded p-1"
                />
                <input
                  type="text"
                  value={edu.start_date}
                  placeholder="Start Date"
                  onChange={e => handleEducationChange(idx, 'start_date', e.target.value)}
                  className="mb-2 w-full border rounded p-1"
                />
                <input
                  type="text"
                  value={edu.end_date}
                  placeholder="End Date"
                  onChange={e => handleEducationChange(idx, 'end_date', e.target.value)}
                  className="mb-2 w-full border rounded p-1"
                />
                <input
                  type="text"
                  value={edu.major}
                  placeholder="Major"
                  onChange={e => handleEducationChange(idx, 'major', e.target.value)}
                  className="mb-2 w-full border rounded p-1"
                />
                <input
                  type="text"
                  value={edu.gpa}
                  placeholder="GPA"
                  onChange={e => handleEducationChange(idx, 'gpa', e.target.value)}
                  className="mb-2 w-full border rounded p-1"
                />
              </div>
            )) : <p className="text-gray-500">No education found.</p>
          }
        </div>
      </div>

      {/* Right Preview */}
      <div className="w-2/3 bg-gray-50 p-8 overflow-y-auto">
        {activeTemplate === 'minimal' ? (
          <MinimalTemplate data={editedData} />
        ) : (
          <ModernTemplate data={editedData} />
        )}
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex justify-between items-center">
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
        <div className="flex gap-4">
          <Button
            variant="secondary"
            onClick={handleExport}
          >
            Export HTML
          </Button>
          <Button
            variant="primary"
            onClick={handleContinue}
            className="w-full py-3 md:py-4 text-base md:text-lg"
          >
            Continue to Cover Letter
          </Button>
        </div>
      </div>
    </div>
  );
}
