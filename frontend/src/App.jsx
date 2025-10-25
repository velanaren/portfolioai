import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Upload from './pages/upload';
import TemplateSelection from './pages/TemplateSelection';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/templates" element={<TemplateSelection />} />
        <Route path="/editor" element={<div className="p-20 text-center text-2xl">Editor Page Coming Soon</div>} />
         </Routes>
    </BrowserRouter>
  );
}

export default App
