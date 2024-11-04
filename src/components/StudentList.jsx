import React from 'react';

const StudentList = ({ currentStudents, selectedPattern, marks, handleInputChange }) => {
    return (
        <>
            {currentStudents.map((regNum) => {
                // Calculate total marks for all sections for the current student
                const totalMarksScored = selectedPattern.reduce((total, pattern) => {
                    const totalQuestions = parseInt(pattern.description.split(' x ')[0]);
                    const sectionTotal = Array.from({ length: totalQuestions }).reduce((sum, _, questionIndex) => {
                        return sum + (parseFloat(marks[regNum]?.[pattern.section]?.[questionIndex]) || 0);
                    }, 0);
                    return total + sectionTotal;
                }, 0);

                return (
                    <div key={regNum} className="mb-6 p-4 border border-gray-300 rounded-md shadow-sm">
                        <h3 className="text-md font-bold text-white bg-purple-500 w-fit px-4 py-2 rounded-r-lg mb-2">Register Number: {regNum}</h3>
                        {selectedPattern.map((pattern, index) => {
                            const totalQuestions = parseInt(pattern.description.split(' x ')[0]);
                            const maxMarksPerQuestion = parseInt(pattern.description.split(' = ')[1]) / totalQuestions;

                            // Calculate total marks for the current section
                            const totalMarks = Array.from({ length: totalQuestions }).reduce((sum, _, questionIndex) => {
                                return sum + (parseFloat(marks[regNum]?.[pattern.section]?.[questionIndex]) || 0);
                            }, 0);

                            return (
                                <div key={index} className="mb-4">
                                    <div className='flex items-center mb-1'>
                                        <h4 className="font-bold text-gray-800">{pattern.section}</h4>
                                        <span className='ml-2 text-gray-500'>- Each Qn: {maxMarksPerQuestion}m</span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-11 gap-4">
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
                                        {/* Display total marks for the section */}
                                        <div className="mb-2">
                                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                                Total Marks
                                            </label>
                                            <input
                                                type="text"
                                                value={totalMarks}
                                                readOnly
                                                className="w-full px-3 py-2 border border-purple-300 rounded-md bg-gray-50"
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        {/* Display total marks scored by the student */}
                        <div className="mt-6 bg-gradient-to-r from-purple-100 to-blue-100 p-4 rounded-lg shadow-md">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="text-lg font-bold text-gray-800 mb-1">
                                        Total Marks Scored
                                    </h4>
                                    <p className="text-sm text-gray-600">Final score for all sections</p>
                                </div>
                                <div className="text-2xl font-bold text-purple-600 bg-white border border-purple-300 px-6 py-3 rounded-lg shadow-sm">
                                    {totalMarksScored}
                                </div>
                            </div>
                        </div>
                        <hr className="my-6 border-gray-200" />
                    </div>
                );
            })}
        </>
    );
};

export default StudentList;
