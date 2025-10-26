import { useState, useEffect } from 'react';

export default function MinimalTemplate({ data }) {
  const [summary, setSummary] = useState('');

  useEffect(() => {
    if (data?.raw_text) {
      setSummary(data.raw_text.slice(0, 300) + (data.raw_text.length > 300 ? '...' : ''));
    }
  }, [data?.raw_text]);

  if (!data) {
    return <div>No data provided</div>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-sm p-8 print:shadow-none">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {data.personal?.name || 'Your Name'}
        </h1>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          {data.personal?.email && (
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a href={`mailto:${data.personal.email}`} className="text-blue-600 hover:underline">
                {data.personal.email}
              </a>
            </div>
          )}
          {data.personal?.phone && (
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>{data.personal.phone}</span>
            </div>
          )}
          {data.personal?.location && (
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{data.personal.location}</span>
            </div>
          )}
        </div>
      </header>

      <hr className="border-gray-200 mb-8" />

      {/* About Section */}
      {summary && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">About</h2>
          <p className="text-gray-700 leading-relaxed">
            {summary}
          </p>
        </section>
      )}

      {/* Skills Section */}
      {data.skills?.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Work Experience Section */}
{data.work_experience && data.work_experience.length > 0 && (
  <section className="mb-8">
    <h2 className="text-xl font-semibold text-gray-900 mb-3">Work Experience</h2>
    <div className="space-y-6">
      {data.work_experience.map((job, idx) => (
        <div key={idx}>
          <h3 className="font-semibold text-lg text-gray-800">
            {job.job_title} at {job.employer}
          </h3>
          <p className="italic text-gray-600 mb-2">
            {job.start_date} - {job.end_date || 'Present'}
          </p>
          <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">
            {job.description}
          </p>
        </div>
      ))}
    </div>
  </section>
)}

{/* Projects Section */}
{data.projects && data.projects.length > 0 && (
  <section className="mb-8">
    <h2 className="text-xl font-semibold text-gray-900 mb-3">Projects</h2>
    <div className="space-y-6">
      {data.projects.map((project, idx) => (
        <div key={idx}>
          <h3 className="font-semibold text-lg text-gray-800">
            {project.title} {project.year && `(${project.year})`}
          </h3>
          {project.tech_stack && (
            <p className="mb-1">
              <strong>Tech Stack:</strong> {project.tech_stack}
            </p>
          )}
          <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">
            {project.description}
          </p>
        </div>
      ))}
    </div>
  </section>
)}

{/* Education Section */}
{data.education && data.education.length > 0 && (
  <section className="mb-8">
    <h2 className="text-xl font-semibold text-gray-900 mb-3">Education</h2>
    <div className="space-y-6">
      {data.education.map((edu, idx) => (
        <div key={idx}>
          <h3 className="font-semibold text-lg text-gray-800">
            {edu.degree} &mdash; {edu.institution}
          </h3>
          <p className="italic text-gray-600 mb-2">
            {edu.start_date} - {edu.end_date || 'Present'}
          </p>
          <p className="text-gray-700 leading-relaxed">
            {edu.major && <span><strong>Major:</strong> {edu.major} </span>}
            {edu.gpa && <span><strong>GPA:</strong> {edu.gpa}</span>}
          </p>
        </div>
      ))}
    </div>
  </section>
)}


      {/* Contact Section */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Contact</h2>
        <div className="text-sm text-gray-700 space-y-2">
          {data.personal?.email && (
            <p>
              <span className="font-medium">Email: </span>
              <a href={`mailto:${data.personal.email}`} className="text-blue-600 hover:underline">
                {data.personal.email}
              </a>
            </p>
          )}
          {data.personal?.phone && (
            <p>
              <span className="font-medium">Phone: </span>
              {data.personal.phone}
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
