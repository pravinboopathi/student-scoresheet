import React from 'react';

const LoadingModal = ({ isOpen }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                {/* Loader */}
                <div className="loader mb-4"></div>
                {/* Message */}
                <p className="text-lg font-medium text-gray-700">Submitting data, please wait...</p>
            </div>
            {/* CSS for spinner */}
            <style>{`
                .loader {
                    border: 4px solid rgba(0, 0, 0, 0.1); /* Light grey border */
                    border-top: 4px solid #3498db; /* Blue border for animation */
                    border-radius: 50%; /* Make it round */
                    width: 40px;
                    height: 40px;
                    animation: spin 1s linear infinite; /* Spin animation */
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default LoadingModal;
