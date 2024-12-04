const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxtssdb78D-BH6_Xj35GaOPlmf4LAAI1FMpZf4vGiXGYffhvOVMev6C_Fn6JOsiWuNbdw/exec';

export const saveToGoogleSheets = async (data, marks) => {
    try {
        console.log('Sending data to serverless function...');

        const exportData = {
            formData: {
                examDate: data.formData.examDate,
                department: data.formData.department,
                class: data.formData.class,
                shift: data.formData.shift,
                courseCode: data.formData.courseCode,
                courseTitle: data.formData.courseTitle.trim(),
                subjectIncharge: data.formData.subjectIncharge
            },
            studentsData: data.students.map(regNum => {
                const studentMarks = marks[regNum] || {};
                return {
                    regNum: regNum,
                    sectionA: Object.values(studentMarks['Section A'] || {}).map(q => q.score || ''),
                    sectionB: Array(5).fill(null).map((_, i) => ({
                        choice: studentMarks['Section B']?.[i]?.choice || 'A',
                        score: studentMarks['Section B']?.[i]?.score || ''
                    })),
                    sectionC: Array(5).fill(null).map((_, i) => ({
                        choice: studentMarks['Section C']?.[i]?.choice || 'A',
                        score: studentMarks['Section C']?.[i]?.score || ''
                    })),
                    totalMarks: calculateTotalMarks(studentMarks)
                };
            })
        };

        const response = await fetch('/api/saveMarks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(exportData),
        });

        const result = await response.json();

        if (result.success) {
            console.log('Spreadsheet created:', result);
            return result;
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        console.error('Error in saveToGoogleSheets:', error);
        throw error;
    }
};

// Helper function to calculate total marks
function calculateTotalMarks(studentMarks) {
    const sectionATotal = Object.values(studentMarks['Section A'] || {})
        .reduce((sum, q) => sum + (parseInt(q.score) || 0), 0);
    
    const sectionBTotal = Object.values(studentMarks['Section B'] || {})
        .reduce((sum, q) => sum + (parseInt(q.score) || 0), 0);
    
    const sectionCTotal = Object.values(studentMarks['Section C'] || {})
        .reduce((sum, q) => sum + (parseInt(q.score) || 0), 0);

    return sectionATotal + sectionBTotal + sectionCTotal;
}
