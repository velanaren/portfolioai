import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/upload" element={<div className="p-20 text-center text-2xl">Upload Page Coming Soon</div>} />
        <Route path="/templates" element={<div className="p-20 text-center text-2xl">Templates Page Coming Soon</div>} />
        <Route path="/editor" element={<div className="p-20 text-center text-2xl">Editor Page Coming Soon</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
