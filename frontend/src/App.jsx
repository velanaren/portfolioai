import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Upload from './pages/upload';
import TemplateSelection from './pages/TemplateSelection';
import Editor from './pages/Editor';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/templates" element={<TemplateSelection />} />
        <Route path="/editor" element={<Editor />} />
         </Routes>
    </BrowserRouter>
  );
}

export default App
