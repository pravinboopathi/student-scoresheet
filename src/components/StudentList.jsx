import React from 'react';

const StudentList = ({ currentStudents, selectedPattern, marks, handleInputChange }) => {
    return (
        <>
            {currentStudents.map((regNum) => (
                <div key={regNum} className="mb-6 p-4 border border-gray-300 rounded-md shadow-sm">
                    <h3 className="text-md font-bold text-white bg-purple-500 w-fit px-4 py-2 rounded-r-lg mb-2">Register Number: {regNum}</h3>
                    {selectedPattern.map((pattern, index) => {
                        const totalQuestions = parseInt(pattern.description.split(' x ')[0]);
                        const maxMarksPerQuestion = parseInt(pattern.description.split(' = ')[1]) / totalQuestions;

                        return (
                            <div key={index} className="mb-4">
                                <div className='flex items-center mb-1'>
                                    <h4 className="font-bold text-gray-800">{pattern.section}</h4>
                                    <span className='ml-2 text-gray-500'>- Each Qn: {maxMarksPerQuestion}m</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-10 gap-4">
                                    {Array.from({ length: totalQuestions }).map((_, questionIndex) => (
                                        <div key={questionIndex} className="mb-2">
                                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                                Question {questionIndex + 1}
                                            </label>
                                            <input
                                                type="number"
                                                value={marks[regNum]?.[pattern.section]?.[questionIndex] ?? ''}
                                                onChange={(e) => handleInputChange(regNum, pattern.section, questionIndex, maxMarksPerQuestion, e)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-purple-500"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                    <hr className="my-4 border-gray-300" />
                </div>
            ))}
        </>
    );
};

export default StudentList;
