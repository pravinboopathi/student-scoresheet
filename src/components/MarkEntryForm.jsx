import React, { useEffect, useState, useRef } from 'react';

import RangeModal from './RangeModal';
import StudentList from './StudentList';
import { FaChevronLeft,FaChevronRight  } from "react-icons/fa";
import { exportToExcel } from '../utils/excelExport';


const MarkEntry = ({ selectedPattern, formData }) => {
    const [students, setStudents] = useState([]);
    const [marks, setMarks] = useState({});
    const [regFrom, setRegFrom] = useState('');
    const [regTo, setRegTo] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const studentsPerPage = 10;
    const [modalOpen, setModalOpen] = useState(false);
    const [totalStudents, setTotalStudents] = useState(0);

    const paginationRef = useRef(null);

    const initializeStudents = () => {
        const from = parseInt(regFrom);
        const to = parseInt(regTo);
        if (!isNaN(from) && !isNaN(to) && from >= 1 && to - from < 70) {
            const studentArray = Array.from({ length: to - from + 1 }, (_, i) => from + i);
            setStudents(studentArray);
            setTotalStudents(studentArray.length);

            const initialMarks = {};
            studentArray.forEach(regNum => {
                initialMarks[regNum] = selectedPattern.reduce((acc, pattern) => {
                    const totalQuestions = parseInt(pattern.description.split(' x ')[0]);
                    acc[pattern.section] = Array.from({ length: totalQuestions }, () => ({
                        choice: 'A',
                        score: ''
                    }));
                    return acc;
                }, {});
            });
            setMarks(initialMarks);
        } else {
            setModalOpen(true);
        }
    };

    useEffect(() => {
        setMarks({});
        setStudents([]);
        setRegFrom('');
        setRegTo('');
        setCurrentPage(1);
        setTotalStudents(0);
    }, [selectedPattern]);

    const handleInputChange = (regNum, section, index, maxMarksPerQuestion, e, type = 'score') => {
        const value = e.target.value;
        
        setMarks(prev => ({
            ...prev,
            [regNum]: {
                ...prev[regNum],
                [section]: {
                    ...prev[regNum][section],
                    [index]: {
                        ...prev[regNum]?.[section]?.[index],
                        [type]: type === 'score' 
                            ? (value === '' ? '' : Math.min(Math.max(parseInt(value, 10), 0), maxMarksPerQuestion))
                            : value
                    }
                }
            }
        }));
    };



    const totalPages = Math.ceil(students.length / studentsPerPage);
    const currentStudents = students.slice((currentPage - 1) * studentsPerPage, currentPage * studentsPerPage);

    useEffect(() => {
        if (currentPage > 1) {
            window.scrollTo(0, 0);
        }
    }, [currentPage]);

    const handleExportToExcel = async () => {
        try {
            if (!students.length) {
                alert('Please initialize students first');
                return;
            }

            console.log('Current marks state:', marks); // Debug log

            // Prepare data for export
            const exportData = {
                formData: {
                    department: formData.department || '',
                    class: formData.class || '',
                    shift: formData.shift || '',
                    courseCode: formData.courseCode || '',
                    courseTitle: formData.courseTitle || '',
                    subjectIncharge: formData.subjectIncharge || '',
                    examDate: formData.examDate || ''
                },
                studentsData: students.map(regNum => {
                    // Ensure marks object exists for this student
                    const studentMarks = marks[regNum] || {};
                    
                    return {
                        regNum,
                        // Section A: 10 questions
                        sectionA: Array(10).fill('').map((_, i) => 
                            studentMarks['Section A']?.[i]?.score || ''
                        ),
                        // Section B: 5 questions with choice
                        sectionB: {
                            choice: studentMarks['Section B']?.[0]?.choice || '',
                            marks: Array(5).fill('').map((_, i) => 
                                studentMarks['Section B']?.[i]?.score || ''
                            )
                        },
                        // Section C: 5 questions with choice
                        sectionC: {
                            choice: studentMarks['Section C']?.[0]?.choice || '',
                            marks: Array(5).fill('').map((_, i) => 
                                studentMarks['Section C']?.[i]?.score || ''
                            )
                        }
                    };
                })
            };

            console.log('Formatted export data:', exportData); // Debug log

            await exportToExcel(exportData);

        } catch (error) {
            console.error('Export failed:', error);
            alert(`Failed to generate Excel file: ${error.message}`);
        }
    };

    const hasEnteredMarks = () => {
        return students.some(regNum => {
            const studentMarks = marks[regNum];
            if (!studentMarks) return false;

            return Object.values(studentMarks).some(section => {
                if (!section) return false;
                return Object.values(section).some(question => 
                    question && question.score && question.score !== ''
                );
            });
        });
    };

    return (
        <div className="bg-white rounded-lg border p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Mark Entry</h2>

            <div className="mb-6 max-w-fit">
                <label className="block text-sm font-medium text-gray-600 mb-1">Register Number From:</label>
                <input
                    type="number"
                    value={regFrom}
                    min="1"
                    onChange={(e) => setRegFrom(e.target.value)}
                    className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Eg : 23127001"
                />
                <label className="block text-sm font-medium text-gray-600 mb-1">Register Number To:</label>
                <input
                    type="number"
                    value={regTo}
                    min="1"
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

            <p className="text-green-600 font-medium mb-4">Total range of students is calculated: {regFrom} - {regTo} (Total: {totalStudents})</p>

            <div id="pagination-arrows" className='flex gap-2 mb-2 cursor-pointer'>
              <div 
                onClick={() => {
                  setCurrentPage(prev => {
                    const newPage = Math.max(prev - 1, 1);
                    setTimeout(() => {
                      document.getElementById('pagination-arrows').scrollIntoView({ behavior: 'smooth' });
                    }, 0);
                    return newPage;
                  });
                }}
                className='bg-blue-500 hover:bg-blue-700 p-2 rounded-full text-white'
              >
                <FaChevronLeft/>
              </div>
              <div 
                onClick={() => {
                  setCurrentPage(prev => {
                    const newPage = Math.min(prev + 1, totalPages);
                    setTimeout(() => {
                      document.getElementById('pagination-arrows').scrollIntoView({ behavior: 'smooth' });
                    }, 0);
                    return newPage;
                  });
                }}
                className='bg-blue-500 hover:bg-blue-700 p-2 rounded-full text-white'
              >
                <FaChevronRight />
              </div>
            </div>
            
            <StudentList
                currentStudents={currentStudents}
                selectedPattern={selectedPattern}
                marks={marks}
                handleInputChange={handleInputChange}
            />

            <div className="flex justify-center mt-4">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => {
                            setCurrentPage(index + 1);
                            setTimeout(() => {
                              document.getElementById('pagination-arrows').scrollIntoView({ behavior: 'smooth' });
                            }, 0);
                        }}
                        className={`mx-1 px-3 py-1 rounded-md ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-700 hover:bg-blue-500 hover:text-white'}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            <RangeModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

            <div className="flex justify-between items-center mt-6">
                <button
                    onClick={handleExportToExcel}
                    disabled={!students.length || !hasEnteredMarks()}
                    className={`px-6 py-2.5 rounded-md transition-colors flex items-center gap-2
                        ${(!students.length || !hasEnteredMarks()) 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
                        } text-white`}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download Excel Sheet
                </button>
            </div>
        </div>
    );
};

export default MarkEntry;
