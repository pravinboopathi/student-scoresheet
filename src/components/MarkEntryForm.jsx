import React, { useEffect, useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import RangeModal from './RangeModal';
import StudentList from './StudentList';
import { FaChevronLeft,FaChevronRight  } from "react-icons/fa";


const MarkEntry = ({ selectedPattern }) => {
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
                    acc[pattern.section] = Array.from({ length: totalQuestions }, () => '');
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

    const totalPages = Math.ceil(students.length / studentsPerPage);
    const currentStudents = students.slice((currentPage - 1) * studentsPerPage, currentPage * studentsPerPage);

    useEffect(() => {
        if (currentPage > 1) {
            window.scrollTo(0, 0);
        }
    }, [currentPage]);

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

            {/* <button onClick={downloadToExcel} className="w-fit mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none">
                Download to Excel
            </button> */}
        </div>
    );
};

export default MarkEntry;
