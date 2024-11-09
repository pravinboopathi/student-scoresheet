import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export const exportToExcel = async (data) => {
    try {
        const workbook = XLSX.utils.book_new();
        
        // Create headers with exact structure
        const headers = [
            ['SRI RAMAKRISHNA COLLEGE OF ARTS & SCIENCE (AUTONOMOUS)'],
            ['Nava India, Coimbatore – 6'],
            ['Academic Year 2023-2024 : Even Semester'],
            ['Attainment for Comprehensive Semester Examination - October / November 2023'],
            [`Month & Year of Examination: ${data.formData.examDate}`],
            [`Department: ${data.formData.department}`, 'Class:', data.formData.class, 'Shift:', data.formData.shift, 'Section:', '1'],
            [`Course Code & Title: ${data.formData.courseCode} ${data.formData.courseTitle}`],
            [`Subject Incharge: ${data.formData.subjectIncharge}`],
            [], // Empty row
            // Mark section headers
            ['', '', '', '', 'Section – A ( 10 x 1= 10 Marks)', '', '', '', '', '', '', 'Section – B ( 5 x 2= 10 Marks)', '', '', '', '', 'Section – C ( 5 x 5= 25 Marks)', '', '', '', '', '', '', '', '', '', 'Section – D ( 3 x 10= 30 Marks)'],
            // Question numbers
            ['S.', 'Register', 'Student', 'Number', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '16', '17', '17', '18', '18', '19', '19', '20', '20', '21', '22', '23', '24', '25', 'Total'],
            ['No', 'Number', 'Name', 'Number', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '(A)', '(B)', '(A)', '(B)', '(A)', '(B)', '(A)', '(B)', '(A)', '(B)', '', '', '', '', '', '(75 Marks)'],
            // Marks row
            ['', '', '', '', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '2', '2', '2', '2', '2', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '10', '10', '10', '10', '10', ''],
            // CO mapping
            ['', '', '', '', 'CO1', 'CO2', 'CO3', 'CO4', 'CO5', 'CO1', 'CO2', 'CO3', 'CO4', 'CO5', 'CO1', 'CO2', 'CO3', 'CO4', 'CO5', 'CO1', 'CO1', 'CO2', 'CO2', 'CO3', 'CO3', 'CO4', 'CO4', 'CO5', 'CO5', 'CO1', 'CO2', 'CO3', 'CO4', 'CO5', ''],
            // L mapping
            ['', '', '', '', 'L2', 'L3', 'L1', 'L1', 'L3', 'L2', 'L2', 'L3', 'L1', 'L1', 'L1', 'L3', 'L2', 'L2', 'L3', 'L3', 'L1', 'L1', 'L3', 'L2', 'L2', 'L5', 'L2', 'L3', 'L2', 'L1', 'L5', 'L2', 'L5', 'L2', '']
        ];

        // Create worksheet
        const worksheet = XLSX.utils.aoa_to_sheet(headers);

        // Add student data starting from row 16
        data.studentsData.forEach((student, index) => {
            const rowNum = 16 + index;
            const row = [
                index + 1,                    // S.No
                student.regNum,               // Register Number
                '',                          // Student Name (empty)
                '',                          // Dummy Number
                ...student.sectionA,         // Section A marks
                ...student.sectionB.marks,   // Section B marks
                ...student.sectionC.marks,   // Section C marks
                ...Array(5).fill(10)         // Section D marks (fixed 10)
            ];

            XLSX.utils.sheet_add_aoa(worksheet, [row], { origin: `A${rowNum}` });
        });

        // Styling
        const headerStyle = {
            font: { bold: true, color: { rgb: "000000" } },
            alignment: { horizontal: "center", vertical: "center" },
            fill: { fgColor: { rgb: "FFFF00" } }  // Yellow background
        };

        // Set column widths
        worksheet['!cols'] = [
            { width: 5 },  // S.No
            { width: 12 }, // Register Number
            { width: 20 }, // Student Name
            { width: 10 }, // Dummy Number
            ...Array(31).fill({ width: 6 }) // Mark columns
        ];

        // Merge cells for headers
        worksheet['!merges'] = [
            { s: { r: 0, c: 0 }, e: { r: 0, c: 34 } }, // College name
            { s: { r: 1, c: 0 }, e: { r: 1, c: 34 } }, // Address
            { s: { r: 2, c: 0 }, e: { r: 2, c: 34 } }, // Academic Year
            { s: { r: 3, c: 0 }, e: { r: 3, c: 34 } }  // Attainment
        ];

        // Add the worksheet to workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Marks');

        // Generate file
        const excelBuffer = XLSX.write(workbook, { 
            bookType: 'xlsx', 
            type: 'array',
            cellStyles: true
        });

        const blob = new Blob([excelBuffer], { 
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
        });

        saveAs(blob, `${data.formData.courseCode}_${data.formData.department}_Marks.xlsx`);

    } catch (error) {
        console.error('Export error:', error);
        throw new Error('Failed to generate Excel file. Please try again.');
    }
}; 