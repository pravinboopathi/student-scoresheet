// Store for all mark entry related data
export const markEntryStore = {
    formData: {
        examDate: '',
        stream: '',
        department: '',
        class: '',
        shift: '',
        courseCode: '',
        courseTitle: '',
        subjectIncharge: '',
        totalMark: ''
    },
    
    marksData: {
        students: [], // Array of register numbers
        marks: {}, // Object containing marks for each student
        sectionChoices: {} // Store section B & C choices (A/B) for each student
    },

    // Helper functions to update store
    updateFormData(data) {
        this.formData = { ...this.formData, ...data };
    },

    updateMarksData(regNum, section, questionIndex, data) {
        if (!this.marksData.marks[regNum]) {
            this.marksData.marks[regNum] = {};
        }
        if (!this.marksData.marks[regNum][section]) {
            this.marksData.marks[regNum][section] = {};
        }
        this.marksData.marks[regNum][section][questionIndex] = {
            ...this.marksData.marks[regNum][section][questionIndex],
            ...data
        };
    },

    // Store section choices for B and C
    updateSectionChoice(regNum, section, choice) {
        if (!this.marksData.sectionChoices[regNum]) {
            this.marksData.sectionChoices[regNum] = {};
        }
        this.marksData.sectionChoices[regNum][section] = choice;
    },

    // Get complete data for excel export
    getExportData() {
        return {
            formData: this.formData,
            marksData: this.marksData
        };
    }
}; 