/// Question Store
const questionStore = [
    { question: "What is the speed of light", subject: "Physics", topic: "Waves", difficulty: "Easy", marks: 5 },
    { question: "What is the capital of France?", difficulty: "Easy", marks: 2 },
    { question: "What is the capital?", difficulty: "Easy", marks: 2 },
    { question: "What is the speed of light", subject: "Physics", topic: "Waves", difficulty: "Easy", marks: 5 },
    { question: "What is the capital of France?", difficulty: "Easy", marks: 1},
    { question: "What is the capital of France?", difficulty: "Easy", marks: 1 },
    { question: "What is?", difficulty: "Easy", marks: 1 },
    { question: "What  light", subject: "Physics", topic: "Waves", difficulty: "Easy", marks: 1 },
    { question: "What is ?", difficulty: "Easy", marks: 1 },
    { question: "What is the ?", difficulty: "Easy", marks: 1 },
    
    { question: "Solve: 2 + 2 * 2", difficulty: "Medium", marks: 4 },
    { question: "Explain the concept of quantum entanglement", difficulty: "Medium", marks: 6 },
    { question: "Explain the concept of probability", difficulty: "Medium", marks: 4 },
    { question: "Explain the concept of probability", difficulty: "Medium", marks: 3 },
    { question: "Who proposed the theory of evolution", difficulty: "Medium", marks: 3 },
    { question: "Solve: 2 + 2 * 2", difficulty: "Medium", marks: 3 },
    { question: "Explain the concept of quantum entanglement", difficulty: "Medium", marks: 6 },
    { question: "Explain the concept of probability", difficulty: "Medium", marks: 5 },
    
    { question: "Explain the concept of quantum entanglement", difficulty: "Hard", marks: 8 },
    { question: "Who proposed the theory of evolution", difficulty: "Hard", marks: 5 },
    { question: "Explain the concept of probability", difficulty: "Hard", marks: 5 },
    { question: "What is the capital of France?", difficulty: "Hard", marks: 8 },
    { question: "What is the capital of France?", difficulty: "Hard", marks: 7 },
    { question: "Explain the concept of quantum entanglement", difficulty: "Hard", marks: 8 },
    { question: "Who proposed the theory of evolution", difficulty: "Hard", marks: 8 },
    { question: "Explain the concept of probability", difficulty: "Hard", marks: 8 },
    // Add more questions...
];

// Helper function to shuffle an array
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Helper function to display questions in a section with marks
function displayQuestionsInSection(questions, section) {
    questions.forEach(question => {
        const questionElement = document.createElement('p');
        questionElement.textContent = `${question.question} (${question.marks} Marks)`;
        section.appendChild(questionElement);
    });
}

// Function to generate questions based on user input
function generateQuestions() {
    const totalMarksInput = document.getElementById('total-marks');
    const totalMarks = parseInt(totalMarksInput.value, 10);

    // Validate that the user entered a valid number
    if (isNaN(totalMarks) || totalMarks <= 0) {
        alert("Please enter a valid positive number for total marks.");
        return;
    }

    // Clear existing questions
    clearQuestions();

    // Get references to the sections
    const easySection = document.getElementById('easy-section');
    const mediumSection = document.getElementById('medium-section');
    const hardSection = document.getElementById('hard-section');

    // Display questions
    displayQuestions(totalMarks, easySection, mediumSection, hardSection);
}

// Helper function to clear existing questions
function clearQuestions() {
    const easySection = document.getElementById('easy-section');
    const mediumSection = document.getElementById('medium-section');
    const hardSection = document.getElementById('hard-section');

    easySection.innerHTML = '';
    mediumSection.innerHTML = '';
    hardSection.innerHTML = '';
}

// Function to display questions based on marks distribution
function displayQuestions(totalMarks, easySection, mediumSection, hardSection) {
    // Calculate the number of questions for each difficulty based on the total marks
    const totalQuestions = questionStore.length;
    const easyCount = Math.round(totalQuestions * 0.2);
    const mediumCount = Math.round(totalQuestions * 0.5);
    const hardCount = totalQuestions - easyCount - mediumCount;

    // Filter questions based on difficulty and shuffle the array
    const easyQuestions = shuffleArray(questionStore.filter(q => q.difficulty === "Easy")).slice(0, easyCount);
    const mediumQuestions = shuffleArray(questionStore.filter(q => q.difficulty === "Medium")).slice(0, mediumCount);
    const hardQuestions = shuffleArray(questionStore.filter(q => q.difficulty === "Hard")).slice(0, hardCount);

    // Adjust marks to match the total marks
    const adjustMarks = (questions, targetMarks) => {
        const total = questions.reduce((acc, q) => acc + q.marks, 0);
        const factor = targetMarks / total;
        questions.forEach(q => {
            q.marks = Math.round(q.marks * factor);
        });
    };

    adjustMarks(easyQuestions, totalMarks * 0.2);
    adjustMarks(mediumQuestions, totalMarks * 0.5);
    adjustMarks(hardQuestions, totalMarks * 0.3);

    // Display questions in respective sections with marks
    displayQuestionsInSection(easyQuestions, easySection);
    displayQuestionsInSection(mediumQuestions, mediumSection);
    displayQuestionsInSection(hardQuestions, hardSection);
}
