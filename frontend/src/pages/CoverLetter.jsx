import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import { generateCoverLetter } from '../utils/api';
import html2pdf from "html2pdf.js";


export default function CoverLetter() {
  const location = useLocation();
  const navigate = useNavigate();
  const portfolioData = location.state?.portfolioData;

  const [jobDescription, setJobDescription] = useState('');
  const [generating, setGenerating] = useState(false);
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!jobDescription.trim()) {
      setError('Please enter a job description');
      return;
    }

    setError('');
    setGenerating(true);

    try {
      const response = await generateCoverLetter(portfolioData, jobDescription);
      setGeneratedLetter(response.coverLetter);
    } catch (err) {
      setError('Failed to generate cover letter. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportPDF = () => {
    const element = document.getElementById('cover-letter-content');
    if (element) {
      html2pdf().from(element).save('cover-letter.pdf');
    }
  };
  

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="space-y-4">
        <label className="block text-lg font-medium text-gray-700">
          Job Description
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={6}
            placeholder="Paste the job description here..."
          />
        </label>

        {error && (
          <p className="text-red-600">{error}</p>
        )}

        <Button
          onClick={handleGenerate}
          disabled={generating}
          className="w-full sm:w-auto"
        >
          {generating ? (
            <LoadingSpinner />
          ) : (
            'Generate Cover Letter'
          )}
        </Button>
      </div>

      {generatedLetter && (
        <div className="space-y-6">
            <textarea
            value={generatedLetter}
            onChange={(e) => setGeneratedLetter(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={12}
             />
            <div  id="cover-letter-content"
            className="bg-white p-8 rounded shadow max-w-2xl mx-auto border font-serif text-lg whitespace-pre-line"
            style={{ background: "#fff",
                color: "#222",
                borderRadius: "0.5rem",
                padding: "2rem",
                maxWidth: "600px",
                margin: "0 auto",
                fontFamily: "'Times New Roman', serif",
                fontSize: "18px",
                boxShadow: "none",
                border: "1px solid #eee", }}
            >
                    {generatedLetter}
            </div>


          <div className="flex flex-wrap gap-4">
            <Button onClick={handleExportPDF}>
              Export as PDF
            </Button>
            <Button onClick={() => navigate(-1)}>
              Back
            </Button>
            <Button onClick={() => navigate('/finish')}>
              Finish
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
