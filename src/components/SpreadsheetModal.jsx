import React from 'react';
import { FaTimes } from "react-icons/fa";

const SpreadsheetModal = ({ isOpen, onClose, spreadsheetInfo }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            {/* Modal Content */}
            <div className="relative bg-white p-8 rounded-lg shadow-lg max-w-md w-full border border-gray-300">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
                >
                    <FaTimes size={18} />
                </button>

                <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                    🎉 Spreadsheet Created Successfully! 🎉
                </h2>

                <p className="text-gray-700 mb-2">
                    <strong>Spreadsheet Name:</strong> {spreadsheetInfo.name}
                </p>

                <p className="text-gray-700 mb-6">
                    <strong>Spreadsheet URL:</strong>
                    <a
                        href={spreadsheetInfo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline break-all"
                    >
                        {spreadsheetInfo.url}
                    </a>
                </p>

                {/* Open Button */}
                <div className="flex justify-center">
                    <a
                        href={spreadsheetInfo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700"
                    >
                        Open Sheet
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SpreadsheetModal;
