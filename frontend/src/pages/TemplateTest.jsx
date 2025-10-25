import MinimalTemplate from '../components/templates/Minimaltemplate';
import ModernTemplate from '../components/templates/ModernTemplate';
import { mockResumeData } from '../utils/mockData';

export default function TemplateTest() {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">
          Template Preview
        </h1>
        
        <div className="space-y-12">
          {/* Minimal Template */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Minimal Template</h2>
            <div className="bg-white p-8 rounded-lg shadow">
              <MinimalTemplate data={mockResumeData} />
            </div>
          </div>

          {/* Modern Template */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Modern Template</h2>
            <div className="rounded-lg shadow overflow-hidden">
              <ModernTemplate data={mockResumeData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
