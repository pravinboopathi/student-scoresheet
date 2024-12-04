import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import ErrorPage from './ErrorPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ResponsiveWrapper from './components/ResponsiveWrapper';
import MarksEntry from './components/MarksEntry';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import ViewSheets from './components/viewSheets';


function App() {
  return (
    <Router>
      <ResponsiveWrapper>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path='/view-sheets' element={<ViewSheets/>} />
            <Route
              path="/marks-entry"
              element={
                <ProtectedRoute>
                  <MarksEntry />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <Footer />
        </div>
      </ResponsiveWrapper>
    </Router>
  );
}

export default App;
