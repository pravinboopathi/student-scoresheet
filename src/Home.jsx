import { useState } from 'react';
import SubjectDetails from './components/SubjectDetails';

const Home = () => {
    const [formData, setFormData] = useState({
        examDate: '',
        department: '',
        class: '',
        shift: '',
        courseCode: '',
        courseTitle: '',
        subjectIncharge: '',
    });

    const [studentMarks, setStudentMarks] = useState([
        {
            regNo: '',
            name: '',
            internal1: '',
            internal2: '',
            model: '',
            assignment: '',
            attendance: ''
        }
    ]);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <h1 className="text-2xl font-bold text-primary underline underline-offset-8 text-center py-5">
                    Student Mark Entry System
                </h1>
                
                <div className="bg-white rounded-lg shadow-md border border-gray-200 p-1">
                    {/* Subject Details Form */}
                    <SubjectDetails formData={formData} setFormData={setFormData} />
                </div>
               
            </div>
        </div>
    );
};

export default Home;