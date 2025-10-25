export default function ModernTemplate({ data }) {
  if (!data) return null;

  const { personal, raw_text, skills } = data;
  const bioPreview = raw_text ? raw_text.slice(0, 300) + (raw_text.length > 300 ? '...' : '') : '';

  const skillColors = [
    'bg-blue-500 hover:bg-blue-600',
    'bg-purple-500 hover:bg-purple-600', 
    'bg-green-500 hover:bg-green-600',
    'bg-pink-500 hover:bg-pink-600'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-r from-blue-500 to-purple-600 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-4">
            {personal?.name || 'Your Name'}
          </h1>
          <div className="space-y-2">
            {personal?.email && (
              <p className="text-white text-lg">📧 {personal.email}</p>
            )}
            {personal?.phone && (
              <p className="text-white text-lg">📱 {personal.phone}</p>
            )}
            {personal?.location && (
              <p className="text-white text-lg">📍 {personal.location}</p>
            )}
          </div>
        </div>
      </div>

      {/* About Section */}
      {bioPreview && (
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-6">
              About Me 👋
            </h2>
            <p className="text-gray-600 text-center text-lg leading-relaxed">
              {bioPreview}
            </p>
          </div>
        </div>
      )}

      {/* Skills Section */}
      {skills?.length > 0 && (
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-8">
              Skills & Technologies 🚀
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {skills.map((skill, index) => (
                <span
                  key={skill}
                  className={`${skillColors[index % skillColors.length]} 
                    text-white px-4 py-2 rounded-full text-sm font-medium
                    transition-colors duration-300`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Contact Section */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-6">
            Let's Connect 📧
          </h2>
          <div className="space-y-4 text-center">
            {personal?.email && (
              <p className="text-lg">
                <span className="font-medium">Email:</span>{' '}
                <a 
                  href={`mailto:${personal.email}`}
                  className="text-blue-500 hover:text-blue-600 transition-colors"
                >
                  {personal.email}
                </a>
              </p>
            )}
            {personal?.phone && (
              <p className="text-lg">
                <span className="font-medium">Phone:</span>{' '}
                <a 
                  href={`tel:${personal.phone}`}
                  className="text-blue-500 hover:text-blue-600 transition-colors"
                >
                  {personal.phone}
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
