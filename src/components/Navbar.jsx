import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import srcasLogo from '../images/srcaslogo.png';

const Navbar = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Left: Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center">
                            <img 
                                src={srcasLogo} 
                                alt="SRCAS Logo" 
                                className="h-12 w-auto"
                            />
                            
                        </Link>
                    </div>

                    {/* Right: Navigation Links and Login */}
                    <div className="flex items-center space-x-4">
                        <div className="hidden md:flex items-center space-x-4">
                            <Link
                                to="/"
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors
                                    ${isActive('/') 
                                        ? 'text-[#7908a9] bg-purple-50' 
                                        : 'text-gray-600 hover:text-[#7908a9] hover:bg-purple-50'
                                    }`}
                            >
                                Home
                            </Link>
                            <Link
                                to="/marks-entry"
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors
                                    ${isActive('/marks-entry') 
                                        ? 'text-[#7908a9] bg-purple-50' 
                                        : 'text-gray-600 hover:text-[#7908a9] hover:bg-purple-50'
                                    }`}
                            >
                                Enter Marks
                            </Link>
                            <Link
                                to="/view-sheets"
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors
                                    ${isActive('/view-sheets') 
                                        ? 'text-[#7908a9] bg-purple-50' 
                                        : 'text-gray-600 hover:text-[#7908a9] hover:bg-purple-50'
                                    }`}
                            >
                                View Sheets
                            </Link>
                        </div>
                        
                        {/* Login Button */}
                        <button 
                            className="bg-[#FFD700] text-gray-800 px-4 py-2 rounded-md text-sm font-medium 
                                     hover:bg-[#F4C430] transition-colors shadow-sm flex items-center space-x-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                            <span>Login</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;