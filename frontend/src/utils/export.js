/**
 * Export portfolio as HTML file
 * @param {string} templateName - 'minimal' or 'modern'
 * @param {Object} data - Resume data
 */
export function exportAsHTML(templateName, data) {
    const html = generateFullHTML(templateName, data);
    
    // Create blob and download
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.personal.name || 'portfolio'}-portfolio.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  
  function generateFullHTML(templateName, data) {
    const templateHTML = templateName === 'minimal' 
      ? generateMinimalHTML(data) 
      : generateModernHTML(data);
    
    return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.personal.name || 'Portfolio'} - Portfolio</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      body { font-family: 'Inter', system-ui, -apple-system, sans-serif; }
    </style>
  </head>
  <body class="bg-gray-50">
    ${templateHTML}
  </body>
  </html>`;
  }
  
  function generateMinimalHTML(data) {
    const { personal, raw_text, skills, work_experience, projects, education } = data;
    
    return `
  <div class="max-w-4xl mx-auto p-8 bg-white my-8 rounded-lg shadow">
    <!-- Header -->
    <header class="mb-8 border-b border-gray-200 pb-6">
      <h1 class="text-4xl font-bold text-gray-900 mb-3">${personal?.name || 'Your Name'}</h1>
      <div class="text-gray-600 space-y-1 text-sm">
        ${personal?.email ? `<p>📧 <a href="mailto:${personal.email}" class="hover:text-blue-600">${personal.email}</a></p>` : ''}
        ${personal?.phone ? `<p>📞 ${personal.phone}</p>` : ''}
        ${personal?.location ? `<p>📍 ${personal.location}</p>` : ''}
      </div>
    </header>
  
    <!-- About -->
    <section class="mb-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">About</h2>
      <p class="text-gray-700 leading-relaxed">${raw_text || 'Professional summary...'}</p>
    </section>
  
    <!-- Skills -->
    ${skills && skills.length > 0 ? `
    <section class="mb-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Skills</h2>
      <div class="flex flex-wrap gap-2">
        ${skills.map(skill => `
          <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">${skill}</span>
        `).join('')}
      </div>
    </section>
    ` : ''}

    <!-- Work Experience -->
    ${work_experience && work_experience.length > 0 ? `
    <section class="mb-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Work Experience</h2>
      <div class="space-y-6">
        ${work_experience.map(job => `
          <div>
            <h3 class="font-semibold text-lg text-gray-800">
              ${job.job_title} at ${job.employer}
            </h3>
            <p class="italic text-gray-600 mb-2">
              ${job.start_date} - ${job.end_date || 'Present'}
            </p>
            <p class="whitespace-pre-wrap text-gray-700 leading-relaxed">
              ${job.description}
            </p>
          </div>
        `).join('')}
      </div>
    </section>
    ` : ''}

    <!-- Projects -->
    ${projects && projects.length > 0 ? `
    <section class="mb-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Projects</h2>
      <div class="space-y-6">
        ${projects.map(project => `
          <div>
            <h3 class="font-semibold text-lg text-gray-800">
              ${project.title} ${project.year ? `(${project.year})` : ''}
            </h3>
            ${project.tech_stack ? `
            <p class="mb-1">
              <strong>Tech Stack:</strong> ${project.tech_stack}
            </p>
            ` : ''}
            <p class="whitespace-pre-wrap text-gray-700 leading-relaxed">
              ${project.description}
            </p>
          </div>
        `).join('')}
      </div>
    </section>
    ` : ''}

    <!-- Education -->
    ${education && education.length > 0 ? `
    <section class="mb-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Education</h2>
      <div class="space-y-6">
        ${education.map(edu => `
          <div>
            <h3 class="font-semibold text-lg text-gray-800">
              ${edu.degree} &mdash; ${edu.institution}
            </h3>
            <p class="italic text-gray-600 mb-2">
              ${edu.start_date} - ${edu.end_date || 'Present'}
            </p>
            <p class="text-gray-700 leading-relaxed">
              ${edu.major ? `<span><strong>Major:</strong> ${edu.major} </span>` : ''}
              ${edu.gpa ? `<span><strong>GPA:</strong> ${edu.gpa}</span>` : ''}
            </p>
          </div>
        `).join('')}
      </div>
    </section>
    ` : ''}
  
    <!-- Contact -->
    <section class="mt-8 pt-6 border-t border-gray-200">
      <h2 class="text-xl font-semibold text-gray-900 mb-3">Contact</h2>
      <div class="text-gray-600">
        ${personal?.email ? `<p>Email: <a href="mailto:${personal.email}" class="text-blue-600 hover:underline">${personal.email}</a></p>` : ''}
        ${personal?.phone ? `<p>Phone: ${personal.phone}</p>` : ''}
      </div>
    </section>
  </div>`;
  }
  
  function generateModernHTML(data) {
    const { personal, raw_text, skills, work_experience, projects, education } = data;
    
    return `
  <!-- Hero -->
  <div class="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20 text-center">
    <h1 class="text-5xl font-bold mb-4">${personal?.name || 'Your Name'}</h1>
    <div class="space-y-2 text-lg">
      ${personal?.email ? `<p>📧 ${personal.email}</p>` : ''}
      ${personal?.phone ? `<p>📱 ${personal.phone}</p>` : ''}
      ${personal?.location ? `<p>📍 ${personal.location}</p>` : ''}
    </div>
  </div>
  
  <!-- Content -->
  <div class="max-w-4xl mx-auto py-12 px-4">
    <!-- About Card -->
    <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
      <h2 class="text-3xl font-bold text-gray-900 mb-4">👋 About Me</h2>
      <p class="text-gray-700 leading-relaxed text-lg">${raw_text || 'Professional summary...'}</p>
    </div>
  
    ${skills && skills.length > 0 ? `
    <!-- Skills Card -->
    <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
      <h2 class="text-3xl font-bold text-gray-900 mb-6">🚀 Skills & Technologies</h2>
      <div class="flex flex-wrap gap-3 justify-center">
        ${skills.map((skill, index) => {
          const colors = ['bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-pink-500', 'bg-indigo-500'];
          const color = colors[index % colors.length];
          return `<span class="${color} text-white px-4 py-2 rounded-full font-semibold text-sm">${skill}</span>`;
        }).join('')}
      </div>
    </div>
    ` : ''}

    <!-- Work Experience -->
    ${work_experience && work_experience.length > 0 ? `
    <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
      <h2 class="text-3xl font-bold text-gray-900 mb-6">💼 Work Experience</h2>
      <div class="space-y-6">
        ${work_experience.map(job => `
          <div>
            <h3 class="font-semibold text-xl text-gray-900">
              ${job.job_title} at ${job.employer}
            </h3>
            <p class="italic text-gray-500 mb-2">
              ${job.start_date} - ${job.end_date || 'Present'}
            </p>
            <p class="whitespace-pre-wrap text-gray-700 leading-relaxed">
              ${job.description}
            </p>
          </div>
        `).join('')}
      </div>
    </div>
    ` : ''}

    <!-- Projects -->
    ${projects && projects.length > 0 ? `
    <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
      <h2 class="text-3xl font-bold text-gray-900 mb-6">🚀 Projects</h2>
      <div class="space-y-6">
        ${projects.map(project => `
          <div>
            <h3 class="font-semibold text-xl text-gray-900">
              ${project.title} ${project.year ? `(${project.year})` : ''}
            </h3>
            ${project.tech_stack ? `
            <p class="mb-1 font-medium text-gray-800">
              Tech Stack: ${project.tech_stack}
            </p>
            ` : ''}
            <p class="whitespace-pre-wrap text-gray-700 leading-relaxed">
              ${project.description}
            </p>
          </div>
        `).join('')}
      </div>
    </div>
    ` : ''}

    <!-- Education -->
    ${education && education.length > 0 ? `
    <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
      <h2 class="text-3xl font-bold text-gray-900 mb-6">🎓 Education</h2>
      <div class="space-y-6">
        ${education.map(edu => `
          <div>
            <h3 class="font-semibold text-xl text-gray-900">
              ${edu.degree} &mdash; ${edu.institution}
            </h3>
            <p class="italic text-gray-500 mb-2">
              ${edu.start_date} - ${edu.end_date || 'Present'}
            </p>
            <p class="text-gray-700 leading-relaxed">
              ${edu.major ? `<span><strong>Major:</strong> ${edu.major} </span>` : ''}
              ${edu.gpa ? `<span><strong>GPA:</strong> ${edu.gpa}</span>` : ''}
            </p>
          </div>
        `).join('')}
      </div>
    </div>
    ` : ''}
  
    <!-- Contact Card -->
    <div class="bg-white rounded-lg shadow-lg p-8 text-center">
      <h2 class="text-3xl font-bold text-gray-900 mb-4">📧 Let's Connect</h2>
      <div class="text-gray-700 space-y-2 text-lg">
        ${personal?.email ? `<p><a href="mailto:${personal.email}" class="text-blue-600 hover:underline">${personal.email}</a></p>` : ''}
        ${personal?.phone ? `<p>${personal.phone}</p>` : ''}
      </div>
    </div>
  </div>`;
  }
  