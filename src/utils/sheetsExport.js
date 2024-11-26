const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz65ux8IZ7flqeWxGCL25PSfCmdwdfZJIR9_Lc1gXRcea-W6FcwPPXbGwOTabcsDR0YYw/exec';
const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1f6392kZ6zO7Zgj-hkmnIirSsSCDdd9ee3RZyWxGZyPM/edit?usp=sharing';

export const saveToGoogleSheets = async (data, marks) => {
    try {
        console.log('Step 1: Initial data received:', {
            formData: data.formData,
            students: data.students,
            marks: marks
        });

        // Restructure the data to match expected format
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
                console.log(`Processing student ${regNum}:`, studentMarks);
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

        console.log('Step 2: Structured data to send:', JSON.stringify(exportData, null, 2));

        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',  // Ensure that CORS issues are handled in the script
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(exportData)
        });

        console.log('Step 3: Response from sheets:', response);
        console.log('Response type:', response.type);
        console.log('Response status:', response.status);

        // Check if the response is opaque (indicating success in Apps Script)
        if (response.type === 'opaque') {
            console.log('Step 4: Opening sheet in new tab');
            window.open(SHEET_URL, '_blank');
            return true;
        }

        return false;
    } catch (error) {
        console.error('Save error:', error);
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
