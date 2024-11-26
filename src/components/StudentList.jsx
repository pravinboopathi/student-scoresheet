import React, { useState } from 'react';

const CustomModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-xl max-w-sm w-full mx-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Edit</h3>
        <p className="text-gray-600 mb-6">This field has already been edited. Do you want to edit it again?</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Edit Again
          </button>
        </div>
      </div>
    </div>
  );
};

const StudentList = ({ currentStudents, selectedPattern, marks, handleInputChange }) => {
    const [editedFields, setEditedFields] = useState({});
    const [modalState, setModalState] = useState({
        isOpen: false,
        pendingEdit: null
    });

    const handleScoreChange = async (regNum, section, questionIndex, maxMarksPerQuestion, e, type) => {
        if (type === 'score' && editedFields[`${regNum}-${section}-${questionIndex}`]) {
            // Store the pending edit and show modal
            setModalState({
                isOpen: true,
                pendingEdit: {
                    regNum,
                    section,
                    questionIndex,
                    maxMarksPerQuestion,
                    value: e.target.value,
                    type
                }
            });
            return;
        }

        handleInputChange(regNum, section, questionIndex, maxMarksPerQuestion, e, type);
        
        if (type === 'score') {
            setEditedFields(prev => ({
                ...prev,
                [`${regNum}-${section}-${questionIndex}`]: true
            }));
        }
    };

    const handleModalConfirm = () => {
        const { pendingEdit } = modalState;
        if (pendingEdit) {
            const e = { target: { value: pendingEdit.value } };
            handleInputChange(
                pendingEdit.regNum,
                pendingEdit.section,
                pendingEdit.questionIndex,
                pendingEdit.maxMarksPerQuestion,
                e,
                pendingEdit.type
            );
        }
        setModalState({ isOpen: false, pendingEdit: null });
    };

    return (
        <>
            <CustomModal
                isOpen={modalState.isOpen}
                onClose={() => setModalState({ isOpen: false, pendingEdit: null })}
                onConfirm={handleModalConfirm}
            />
            
            {currentStudents.map((regNum) => {
                const totalMarksScored = selectedPattern.reduce((total, pattern) => {
                    const totalQuestions = parseInt(pattern.description.split(' x ')[0]);
                    const sectionTotal = Array.from({ length: totalQuestions }).reduce((sum, _, questionIndex) => {
                        return sum + (parseFloat(marks[regNum]?.[pattern.section]?.[questionIndex]?.score) || 0);
                    }, 0);
                    return total + sectionTotal;
                }, 0);

                return (
                    <div key={regNum} className="mb-6 p-4 border border-gray-300 rounded-md shadow-sm">
                        <h3 className="text-md font-bold text-white bg-purple-500 w-fit px-4 py-2 rounded-r-lg mb-2">
                            Register Number: {regNum}
                        </h3>
                        {selectedPattern.map((pattern, index) => {
                            const totalQuestions = parseInt(pattern.description.split(' x ')[0]);
                            const maxMarksPerQuestion = parseInt(pattern.description.split(' = ')[1]) / totalQuestions;
                            const isEitherOrSection = pattern.section.includes('Section B') || pattern.section.includes('Section C');

                            const totalMarks = Array.from({ length: totalQuestions }).reduce((sum, _, questionIndex) => {
                                return sum + (parseFloat(marks[regNum]?.[pattern.section]?.[questionIndex]?.score) || 0);
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
                                                <label className="block text-sm font-medium text-center text-purple-800 ">
                                                    Qn {questionIndex + 1}
                                                </label>
                                                {isEitherOrSection ? (
                                                    <div className="space-y-2 p-2 rounded-md">
                                                        <select
                                                            value={marks[regNum]?.[pattern.section]?.[questionIndex]?.choice || ''}
                                                            onChange={(e) => handleScoreChange(regNum, pattern.section, questionIndex, maxMarksPerQuestion, e, 'choice')}
                                                            className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:border-purple-500 bg-white text-sm hover:border-purple-400 transition-colors"
                                                        >
                                                            <option value="" className="text-gray-500">Option</option>
                                                            <option value="A"> A</option>
                                                            <option value="B"> B</option>
                                                        </select>
                                                        <input
                                                            type="number"
                                                            value={marks[regNum]?.[pattern.section]?.[questionIndex]?.score ?? ''}
                                                            onChange={(e) => handleScoreChange(regNum, pattern.section, questionIndex, maxMarksPerQuestion, e, 'score')}
                                                            className={`w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:border-purple-500 
                                                                disabled:bg-gray-100 disabled:cursor-not-allowed hover:border-purple-400 transition-colors
                                                                ${editedFields[`${regNum}-${pattern.section}-${questionIndex}`] ? 'bg-gray-50 border-yellow-300' : ''}`}
                                                            disabled={!marks[regNum]?.[pattern.section]?.[questionIndex]?.choice}
                                                            placeholder={!marks[regNum]?.[pattern.section]?.[questionIndex]?.choice ? "Select option first" : `Enter marks (max: ${maxMarksPerQuestion})`}
                                                        />
                                                    </div>
                                                ) : (
                                                    <input
                                                        type="number"
                                                        value={marks[regNum]?.[pattern.section]?.[questionIndex]?.score ?? ''}
                                                        onChange={(e) => handleScoreChange(regNum, pattern.section, questionIndex, maxMarksPerQuestion, e, 'score')}
                                                        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-purple-500
                                                            ${editedFields[`${regNum}-${pattern.section}-${questionIndex}`] ? 'bg-gray-50' : ''}`}
                                                    />
                                                )}
                                            </div>
                                        ))}
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
