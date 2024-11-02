import React from 'react';
import { useState } from 'react';
import { streams } from './data';
import MarkEntry from './MarkEntryForm';

const SubjectDetails = ({ formData, setFormData }) => {
    
    const [selectedStream, setSelectedStream] = useState('');

    const handleStreamChange = (e) => {
        const selectedStreamName = e.target.value;
        setSelectedStream(selectedStreamName);
        setFormData(prev => ({
            ...prev,
            department: '',  // Reset department when stream changes
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const selectedStreamData = streams.find(stream => stream.name === selectedStream);

    const patternOptions = formData.totalMark === '75'
        ? [
            { section: 'Section A', description: '10 x 2 = 20 Marks' },
            { section: 'Section B', description: '5 x 4 = 20 Marks' },
            { section: 'Section C', description: '5 x 7 = 35 Marks' }
        ]
        : formData.totalMark === '50'
            ? [
                { section: 'Section A', description: '10 x 1 = 10 Marks' },
                { section: 'Section B', description: '5 x 2 = 10 Marks' },
                { section: 'Section C', description: '5 x 6 = 30 Marks' }
            ]
            : [];

    return (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            {/* Month & Year of Examination */}
            <div className='grid grid-cols-3 gap-4 mb-6'>
                <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Month & Year of Examination</label>
                    <input
                        type="month"
                        name="examDate"
                        value={formData.examDate}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-purple-400 focus:border-purple-400"
                    />
                </div>

                {/* Stream Selection */}
                <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Stream</label>
                    <select
                        name="stream"
                        value={selectedStream}
                        onChange={handleStreamChange}
                        className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-purple-400 focus:border-purple-400"
                    >
                        <option value="">Select Stream</option>
                        {streams.map((stream, index) => (
                            <option key={index} value={stream.name}>{stream.name}</option>
                        ))}
                    </select>
                </div>

                {/* Department Selection */}
                <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Department</label>
                    <select
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-purple-400 focus:border-purple-400"
                    >
                        <option value="">Select Department</option>
                        {selectedStreamData?.departments.map((department, index) => (
                            <option key={index} value={department}>{department}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Class</label>
                    <select
                        name="class"
                        value={formData.class}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-purple-400 focus:border-purple-400"
                    >
                        <option value="">Select Class</option>
                        <option value="I">I Year</option>
                        <option value="II">II Year</option>
                        <option value="III">III Year</option>
                        <option value="PG - I">PG - I Year</option>
                        <option value="PG - II">PG - II Year</option>
                        <option value="PG - II">PG - III Year</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Shift</label>
                    <select
                        name="shift"
                        value={formData.shift}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-purple-400 focus:border-purple-400"
                    >
                        <option value="">Select Shift</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>
                </div>
            </div>

            {/* Course Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Course Code</label>
                    <input
                        type="text"
                        name="courseCode"
                        value={formData.courseCode}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-purple-400 focus:border-purple-400"
                        placeholder="Enter course code"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Course Title</label>
                    <input
                        type="text"
                        name="courseTitle"
                        value={formData.courseTitle}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-purple-400 focus:border-purple-400"
                        placeholder="Enter course title"
                    />
                </div>
            </div>

            {/* Subject Incharge */}
            <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Subject Incharge</label>
                <input
                    type="text"
                    name="subjectIncharge"
                    value={formData.subjectIncharge}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-purple-400 focus:border-purple-400"
                    placeholder="Enter subject incharge name"
                />
            </div>

            {/* Total Mark and Pattern Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 mt-4">
                <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Total Mark</label>
                    <select
                        name="totalMark"
                        value={formData.totalMark}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-purple-400 focus:border-purple-400"
                    >
                        <option value="">Select Total Mark</option>
                        <option value="75">75</option>
                        <option value="50">50</option>
                    </select>
                </div>

                {/* Pattern Type Details (Dynamic) */}
                {formData.totalMark && (
                    <div className="col-span-1 md:col-span-2 mt-4">
                        <label className="block text-sm font-medium text-gray-900 mb-2">Pattern Type</label>
                        {patternOptions.map((pattern, index) => (
                            <div key={index} className="p-2 border border-gray-300 rounded-md mb-2">
                                <strong>{pattern.section}</strong>: {pattern.description}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <MarkEntry selectedPattern={patternOptions} />
        </div>
    );
};

export default SubjectDetails;
