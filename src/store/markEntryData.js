export const markEntryStore = {
    formData: {
        examDate: '',
        department: '',
        class: '',
        shift: '',
        courseCode: '',
        courseTitle: '',
        subjectIncharge: '',
        totalMark: ''
    },
    
    marksData: {
        students: [], 
        marks: {}, 
        sectionChoices: {} 
    },

    updateFormData(data) {
        // Log the update for debugging
        console.log('Updating form data:', data);
        this.formData = { ...this.formData, ...data };
        console.log('Updated form data:', this.formData);
    },

    // ... rest of your code remains the same ...

    getExportData() {
        // Log the export data for debugging
        const exportData = {
            formData: this.formData,
            students: this.marksData.students,
            marks: this.marksData.marks
        };
        console.log('Export data:', exportData);
        return exportData;
    }
};