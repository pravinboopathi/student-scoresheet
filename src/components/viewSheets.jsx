import React, { useState, useEffect } from 'react';

const ViewSheets = () => {
    const [recentSheets, setRecentSheets] = useState([]);

    useEffect(() => {
        // Fetch recent sheets from localStorage
        const savedSheets = JSON.parse(localStorage.getItem('recentSheets') || '[]');
        setRecentSheets(savedSheets);
    }, []);

    // Function to format the date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB'); // en-GB ensures dd/mm/yyyy format
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                Recent Sheets
            </h1>
            {recentSheets.length === 0 ? (
                <p className="text-lg text-gray-600 text-center">
                    No sheets have been created yet.
                </p>
            ) : (
                <ul className="max-w-4xl mx-auto space-y-6">
                    {recentSheets.map((sheet, index) => (
                        <li
                            key={index}
                            className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
                        >
                            <p className="text-xl font-semibold text-gray-800 mb-2">
                                <span className="font-bold">Sheet Name:</span> {sheet.name}
                            </p>
                            <p className="text-lg text-gray-700 mb-2">
                                <span className="font-bold">Course Code:</span> {sheet.courseCode || 'N/A'}
                            </p>
                            <p className="text-lg text-gray-600 mb-4">
                                <span className="font-bold">Created on:</span> {formatDate(sheet.createdAt)}
                            </p>
                            <a
                                href={sheet.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-blue-600 text-white text-lg font-medium px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all"
                            >
                                Open Sheet
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ViewSheets;
