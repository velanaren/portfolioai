import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import MinimalTemplate from '../components/templates/MinimalTemplate';
import ModernTemplate from '../components/templates/ModernTemplate';
import { generateBio } from '../utils/api';
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

  const [editedData, setEditedData] = useState(resumeData);
  const [generating, setGenerating] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState(templateName);
  const [skills, setSkills] = useState(resumeData.skills || []);
  const [newSkill, setNewSkill] = useState('');
  

  const handleInputChange = (field, value) => {
    setEditedData({
      ...editedData,
      personal: {
        ...editedData.personal,
        [field]: value
      }
    });
  };

  const handleGenerateBio = async () => {
    try {
      setGenerating(true);
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
      setGenerating(false);
    }
  };

  const handleAddSkill = () => {
    if (!newSkill.trim()) return; // Ignore empty values
    if (
      editedData.skills &&
      editedData.skills.some(
        (skill) => skill.toLowerCase() === newSkill.trim().toLowerCase()
      )
    )
      return; // Ignore duplicates
  
    setEditedData({
      ...editedData,
      skills: [...(editedData.skills || []), newSkill.trim()],
    });
    setNewSkill('');
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
    setEditedData({
      ...editedData,
      skills: updatedSkills
    });
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
      {/* Left Sidebar */}
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
              value={editedData.personal.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={editedData.personal.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
            <input
              type="tel"
              placeholder="Phone"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={editedData.personal.phone || ''}
              onChange={(e) => handleInputChange('phone', e.target.value)}
            />
          </div>
        </div>

        {/* Bio Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Professional Bio</h2>
          <textarea
            rows={6}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2"
            value={editedData.raw_text || ''}
            onChange={(e) => setEditedData({...editedData, raw_text: e.target.value})}
          />
          <Button 
            variant="secondary"
            size="small"
            onClick={handleGenerateBio}
            disabled={generating}
          >
            {generating ? (
              <span className="flex items-center">
                <LoadingSpinner className="w-4 h-4 mr-2" />
                Generating...
              </span>
            ) : (
              '✨ Generate with AI'
            )}
          </Button>
        </div>

        {/* Skills Section */}
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
