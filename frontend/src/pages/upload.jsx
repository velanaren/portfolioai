import { useState } from 'react';
import './upload.css';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { uploadResume } from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';

export default function Upload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [parsedData, setParsedData] = useState(null);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (
      droppedFile &&
      [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain'
      ].includes(droppedFile.type)
    ) {
      setFile(droppedFile);
      setError(null);
    } else {
      setError('Please upload a PDF, DOCX, or TXT file.');
    }
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleRemove = () => {
    setFile(null);
    setParsedData(null);
    setError(null);
  };

  const handleParse = async () => {
    setUploading(true);
    setError(null);

    try {
      const result = await uploadResume(file);

      if (result.success === true) {
        const data = result.data;
        // Normalize arrays for display safety:
        data.skills = Array.isArray(data.skills) ? data.skills : [];
        data.work_experience = Array.isArray(data.work_experience) ? data.work_experience : [];
        data.projects = Array.isArray(data.projects) ? data.projects : [];
        data.education = Array.isArray(data.education) ? data.education : [];
        setParsedData(data);
        setFile(null);
        window.lastResumeDebug = data; // For browser debugging
        console.log('Resume debug:', data);
      } else {
        setError(result.error || 'Failed to parse resume');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while parsing your resume');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Upload Your Resume</h1>
        <p className="text-gray-600">Supported formats: PDF, DOCX, TXT (Max 5MB)</p>
      </div>

      {!file && !parsedData && (
        <div
          className={`border-2 border-dashed rounded-lg p-16 text-center cursor-pointer
            transition-all duration-300 ease-in-out
            ${isDragging
              ? 'border-blue-500 bg-blue-50 shadow-lg'
              : 'border-gray-300 hover:border-gray-400 hover:shadow-lg hover:bg-gray-50'
            }`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => document.getElementById('fileInput').click()}
        >
          <div className="text-6xl mb-4">📄</div>
          <p className="text-xl mb-2">Drag & drop your resume here</p>
          <p className="text-gray-500">or click to browse</p>
          <input
            id="fileInput"
            type="file"
            className="hidden"
            accept=".pdf,.docx,.txt"
            onChange={handleFileSelect}
          />
        </div>
      )}

      {file && !parsedData && !uploading && (
        <div className="border rounded-lg p-8 shadow-sm hover:shadow transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-start gap-3">
              <div>
                <p className="font-semibold mb-1">{file.name}</p>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium
                  ${file.size > 4 * 1024 * 1024
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                  } transition-colors duration-300`}>
                  {formatFileSize(file.size)}
                </span>
              </div>
            </div>
            <button
              onClick={handleRemove}
              className="text-red-500 hover:text-red-600 transition-colors duration-300"
            >
              Remove
            </button>
          </div>
          <Button
            onClick={handleParse}
            className="w-full py-3 text-lg"
          >
            Parse Resume
          </Button>
        </div>
      )}

      {uploading && (
        <LoadingSpinner text="Parsing your resume..." />
      )}

      {parsedData && (
        <div className="border rounded-lg p-8 shadow-md bg-gradient-to-b from-green-50/50 animate-fade-in">
          <div className="text-center mb-8">
            <div className="text-5xl mb-3 animate-bounce">✅</div>
            <p className="text-2xl font-semibold text-green-600 glow-green">Resume parsed successfully!</p>
          </div>

          <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
            <h3 className="font-semibold mb-5 text-lg">Detected Information:</h3>
            <div className="space-y-3">
              <p className="mb-2"><span className="font-medium text-gray-700">Name:</span> {parsedData.personal?.name}</p>
              <p className="mb-2"><span className="font-medium text-gray-700">Email:</span> {parsedData.personal?.email}</p>
              <p className="mb-2"><span className="font-medium text-gray-700">Phone:</span> {parsedData.personal?.phone}</p>
              <p><span className="font-medium text-gray-700">Skills:</span> {parsedData.skills.length} skills detected</p>
              <p><span className="font-medium text-gray-700">Experience:</span> {parsedData.work_experience.length} entries</p>
              <p><span className="font-medium text-gray-700">Projects:</span> {parsedData.projects.length} projects</p>
              <p><span className="font-medium text-gray-700">Education:</span> {parsedData.education.length} entries</p>
              {parsedData.work_experience.length > 0 && (
                <>
                  <h4 className="font-semibold mt-4">Experience Sample:</h4>
                  <pre className="text-xs bg-gray-100 p-2 rounded">
                    {JSON.stringify(parsedData.work_experience[0], null, 2)}
                  </pre>
                </>
              )}
              {parsedData.education.length > 0 && (
                <>
                  <h4 className="font-semibold mt-4">Education Sample:</h4>
                  <pre className="text-xs bg-gray-100 p-2 rounded">
                    {JSON.stringify(parsedData.education[0], null, 2)}
                  </pre>
                </>
              )}
            </div>
            <details>
              <summary className="cursor-pointer mt-4">Show Full Parsed Data (DEV)</summary>
              <pre className="text-xs bg-gray-100 p-2 rounded">{JSON.stringify(parsedData, null, 2)}</pre>
            </details>
          </div>

          <Button
            onClick={() => navigate('/templates', { state: { resumeData: parsedData } })}
            className="w-full py-3 text-lg"
          >
            Continue to Templates
          </Button>
        </div>
      )}

      {error && (
        <ErrorAlert message={error} onRetry={() => setError(null)} />
      )}
    </div>
  );
}
