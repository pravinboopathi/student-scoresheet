import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import ErrorPage from './ErrorPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ResponsiveWrapper from './components/ResponsiveWrapper';
import MarksEntry from './components/MarksEntry';

function App() {
  return (
    <Router>
      <ResponsiveWrapper>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/marks-entry" element={<MarksEntry />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <Footer />
        </div>
      </ResponsiveWrapper>
    </Router>
  );
}

export default App;
