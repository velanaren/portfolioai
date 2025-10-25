import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Resume to Portfolio in 60 Seconds
          </h1>
          <p className="text-xl text-white text-opacity-80 mb-8">
            AI-powered portfolio generator with instant cover letters
          </p>
          <Button variant="primary" size="lg" onClick={() => navigate('/upload')}>
            Create Your Portfolio
          </Button>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center p-6">
              <div className="text-6xl mb-4">📄</div>
              <div className="inline-block bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mb-4">1</div>
              <h3 className="text-2xl font-semibold mb-4">Upload Resume</h3>
              <p className="text-gray-600">Simply upload your resume and let our AI do the heavy lifting</p>
            </div>
            <div className="text-center p-6">
              <div className="text-6xl mb-4">✨</div>
              <div className="inline-block bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mb-4">2</div>
              <h3 className="text-2xl font-semibold mb-4">AI Magic</h3>
              <p className="text-gray-600">Our AI transforms your resume into a stunning portfolio</p>
            </div>
            <div className="text-center p-6">
              <div className="text-6xl mb-4">🚀</div>
              <div className="inline-block bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mb-4">3</div>
              <h3 className="text-2xl font-semibold mb-4">Deploy</h3>
              <p className="text-gray-600">Get your professional portfolio live in seconds</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold mb-2">AI Bio Generation</h3>
              <p className="text-gray-600">Automatically generate professional bios that highlight your strengths</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-semibold mb-2">Cover Letter Creator</h3>
              <p className="text-gray-600">Create tailored cover letters for any job application</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">One-Click Deploy</h3>
              <p className="text-gray-600">Deploy your portfolio instantly with just one click</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold mb-2">Professional Templates</h3>
              <p className="text-gray-600">Choose from a variety of modern, professional templates</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
