import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

const MarkEntry = ({ selectedPattern }) => {
    const [students, setStudents] = useState([]);
    const [marks, setMarks] = useState({});
    const [regFrom, setRegFrom] = useState('');
    const [regTo, setRegTo] = useState('');

    const initializeStudents = () => {
        const from = parseInt(regFrom);
        const to = parseInt(regTo);
        if (!isNaN(from) && !isNaN(to) && from >= 1 && from <= to) { // Check if from >= 1
            const studentArray = Array.from({ length: to - from + 1 }, (_, i) => from + i);
            setStudents(studentArray);
            const initialMarks = {};
            studentArray.forEach(regNum => {
                initialMarks[regNum] = selectedPattern.reduce((acc, pattern) => {
                    const totalQuestions = parseInt(pattern.description.split(' x ')[0]);
                    acc[pattern.section] = Array.from({ length: totalQuestions }, () => '');
                    return acc;
                }, {});
            });
            setMarks(initialMarks);
        } else {
            alert("Please enter valid register numbers (1 or higher) and ensure 'From' is less than or equal to 'To'.");
        }
    };

    useEffect(() => {
        setMarks({});
        setStudents([]);
        setRegFrom('');
        setRegTo('');
    }, [selectedPattern]);

    const handleInputChange = (regNum, section, index, maxMarksPerQuestion, e) => {
        const inputValue = e.target.value;
        const parsedValue = inputValue === '' ? '' : Math.min(Math.max(parseInt(inputValue, 10), 0), maxMarksPerQuestion);

        setMarks(prev => ({
            ...prev,
            [regNum]: {
                ...prev[regNum],
                [section]: {
                    ...prev[regNum][section],
                    [index]: parsedValue
                }
            }
        }));
    };

    const downloadToExcel = () => {
        const data = students.flatMap(regNum => 
            selectedPattern.flatMap(pattern => {
                const sectionMarks = marks[regNum][pattern.section] || {};
                const totalQuestions = parseInt(pattern.description.split(' x ')[0]);
                return Array.from({ length: totalQuestions }).map((_, questionIndex) => ({
                    RegNum: regNum,
                    Section: pattern.section,
                    Question: `Question ${questionIndex + 1}`,
                    Mark: sectionMarks[questionIndex] || 0
                }));
            })
        );

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Marks Entry");
        XLSX.writeFile(workbook, "MarkEntry.xlsx");
    };

    return (
        <div className="bg-white rounded-lg border p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Mark Entry</h2>

            <div className="mb-6 max-w-fit">
                <label className="block text-sm font-medium text-gray-600 mb-1">Register Number From:</label>
                <input
                    type="number"
                    value={regFrom}
                    min="1" // Set minimum value to 1
                    onChange={(e) => setRegFrom(e.target.value)}
                    className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Eg : 23127001"
                />
                <label className="block text-sm font-medium text-gray-600 mb-1">Register Number To:</label>
                <input
                    type="number"
                    value={regTo}
                    min="1" // Set minimum value to 1
                    onChange={(e) => setRegTo(e.target.value)}
                    className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Eg : 23127050"
                />
                <button
                    onClick={initializeStudents}
                    className="w-fit mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                >
                    Initialize Students
                </button>
            </div>

            {students.map((regNum) => (
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

            {/* <button onClick={downloadToExcel} className="w-fit mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none">
                Download to Excel
            </button> */}
        </div>
    );
};

export default MarkEntry;
