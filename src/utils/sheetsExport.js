const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz65ux8IZ7flqeWxGCL25PSfCmdwdfZJIR9_Lc1gXRcea-W6FcwPPXbGwOTabcsDR0YYw/exec';
const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1f6392kZ6zO7Zgj-hkmnIirSsSCDdd9ee3RZyWxGZyPM/edit?usp=sharing';

export const saveToGoogleSheets = async (data, marks) => {
    try {
        const preflightResponse = await fetch(SCRIPT_URL, {
            method: 'OPTIONS',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            mode: 'cors'
        });

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

        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            redirect: 'follow',
            body: JSON.stringify(exportData)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Response not OK:', errorText);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        if (result.success) {
            window.open(SHEET_URL, '_blank');
            return true;
        }
        throw new Error(result.message || 'Failed to save to sheet');
    } catch (error) {
        console.error('Save error:', error);
        throw new Error(`Failed to save marks: ${error.message}`);
    }
};

function calculateTotalMarks(studentMarks) {
    const sectionATotal = Object.values(studentMarks['Section A'] || {})
        .reduce((sum, q) => sum + (parseInt(q.score) || 0), 0);
    
    const sectionBTotal = Object.values(studentMarks['Section B'] || {})
        .reduce((sum, q) => sum + (parseInt(q.score) || 0), 0);
    
    const sectionCTotal = Object.values(studentMarks['Section C'] || {})
        .reduce((sum, q) => sum + (parseInt(q.score) || 0), 0);

    return sectionATotal + sectionBTotal + sectionCTotal;
}