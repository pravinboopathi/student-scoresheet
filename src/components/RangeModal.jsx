import React from 'react';

const RangeModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                <h3 className="text-lg font-semibold mb-4">Invalid Register Number Range</h3>
                <p className="text-gray-600 mb-4">Please enter valid register numbers (1 or more) with a maximum range of less than 70.</p>
                <button
                    onClick={onClose}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default RangeModal;
