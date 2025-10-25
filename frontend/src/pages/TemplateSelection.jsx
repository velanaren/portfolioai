import { useState, Suspense } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import MinimalTemplate from '../components/templates/Minimaltemplate';
import ModernTemplate from '../components/templates/ModernTemplate';
import LoadingSpinner from '../components/LoadingSpinner';
import './template-selection.css';

export default function TemplateSelection() {
  const location = useLocation();
  const navigate = useNavigate();
  const resumeData = location.state?.resumeData;

  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [previewTemplate, setPreviewTemplate] = useState(null);

  if (!resumeData) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">No Resume Data Found</h2>
        <p className="text-gray-600 mb-8">Please upload your resume first to continue.</p>
        <Button onClick={() => navigate('/upload')}>
          Go to Upload
        </Button>
      </div>
    );
  }

  const handleSelect = (templateName) => {
    setSelectedTemplate(templateName);
  };

  const handlePreview = (templateName) => {
    setPreviewTemplate(templateName);
  };

  const handleClosePreview = () => {
    setPreviewTemplate(null);
  };

  const handleContinue = () => {
    navigate('/editor', {
      state: {
        template: selectedTemplate,
        resumeData
      }
    });
  };

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="text-center py-12 px-4">
        <h1 className="text-3xl font-bold mb-3">Choose Your Template</h1>
        <p className="text-gray-600">Select the template that best represents you</p>
      </div>

      {/* Template Grid */}
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        {/* Minimal Template Card */}
        <div className={`template-card border rounded-xl p-4 md:p-6 transition-all duration-300 ${
          selectedTemplate === 'minimal' ? 'border-blue-500 selected' : 'border-gray-200'
        }`}>
          <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded border-2 border-gray-300 flex items-center justify-center mb-4">
            <span className="text-gray-400 text-sm">Clean & Professional</span>
          </div>
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Minimal</h3>
            <p className="text-gray-600 mb-6">Clean and professional, perfect for developers</p>
            <div className="flex gap-4">
              <button
                onClick={() => handlePreview('minimal')}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Preview
              </button>
              <Button
                onClick={() => handleSelect('minimal')}
                className="flex-1"
              >
                Select
              </Button>
            </div>
          </div>
        </div>

        {/* Modern Template Card */}
        <div className={`template-card border rounded-xl p-4 md:p-6 transition-all duration-300 ${
          selectedTemplate === 'modern' ? 'border-blue-500 selected' : 'border-gray-200'
        }`}>
          <div className="h-64 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center mb-4">
            <span className="text-white text-sm font-semibold">Colorful & Creative</span>
          </div>
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Modern</h3>
            <p className="text-gray-600 mb-6">Colorful and creative, stand out from the crowd</p>
            <div className="flex gap-4">
              <button
                onClick={() => handlePreview('modern')}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Preview
              </button>
              <Button
                onClick={() => handleSelect('modern')}
                className="flex-1"
              >
                Select
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 modal-overlay">
          <div className="bg-white rounded-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto relative modal-content">
            <button
              onClick={handleClosePreview}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl transition-colors"
            >
              ×
            </button>
            <div className="p-4 md:p-8">
              <Suspense fallback={<LoadingSpinner text="Loading template..." />}>
                {previewTemplate === 'minimal' ? (
                  <MinimalTemplate data={resumeData} />
                ) : (
                  <ModernTemplate data={resumeData} />
                )}
              </Suspense>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Action Bar */}
      {selectedTemplate && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 animate-fade-in">
          <div className="max-w-6xl mx-auto px-4">
            <Button
              onClick={handleContinue}
              className="w-full py-3 md:py-4 text-base md:text-lg"
            >
              Continue to Editor
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
