// the quiz questions and answers
const questions = [
    {
        question: "What is the full form of CSS?",
        answers: [
            { Text: "Content Style Sheets", correct: false},
            { Text: "Cascading Style Sheets", correct: true},
            { Text: "Computer Style Sheets", correct: false},
            { Text: "Creative Style Sheets", correct: false},
        ]
    },
    {
        question: "Which of the following is NOT a valid CSS selector?",
        answers: [
            { Text: " *", correct: true},
            { Text: "$element", correct: false},
            { Text: ".class", correct: false},
            { Text: "#id", correct: false},
        ]
    },
    {
        question: "In CSS, which property is used to change the text color of an element?",
        answers: [
            { Text: "font-style", correct: false},
            { Text: "text-color", correct: false},
            { Text: "font-color", correct: false},
            { Text: "color", correct: true},
        ]
    },
    {
        question: "What does the Cascading in CSS refer to?",
        answers: [
            { Text: " It refers to the hierarchy of HTML elements.", correct: false},
            { Text: "It refers to the cascading effect of styles applied from parent to child elements.", correct: false},
            { Text: "It refers to the ability to override styles from multiple sources.", correct: true},
            { Text: "It refers to the process of applying multiple styles to an element.", correct: false},
        ] 
    }
];
// Getting references to various elements in the HTML
const authSection = document.getElementById("authSection");
const quizSection = document.getElementById("quizSection");
const authMessage = document.getElementById("authMessage");
const loginBtn = document.getElementById("loginBtn");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-btn");
const nextButton = document.getElementById("next-btn");
// variables to keep track of quiz state
let currentQuestionIndex = 0;
let score = 0;
// username and password for authentication
const correctUsername = "user";
const correctPassword = "password";
// Event listener for the login button
loginBtn.addEventListener("click", () => {
    // Getting the entered username and password
    const enteredUsername = usernameInput.value;
    const enteredPassword = passwordInput.value;
    // Checking if entered credentials match the correct ones
    if (enteredUsername === correctUsername && enteredPassword === correctPassword) {
        // If credentials are correct, hide the login section and show the quiz section
        authSection.style.display = "none";
        quizSection.style.display = "block"; 
        startQuiz();// Start the quiz
    } else {
        // If credentials are incorrect, display an error message
        authMessage.style.display = "block";
    }
});
// Function to start the quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();// Show the first question
}
// Function to display the current question
function showQuestion() {
    resetState();// Reset the state (clear previous question and answers)
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        // Created buttons for each answer option
        const button = document.createElement("button");
        button.innerHTML = answer.Text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer); // Added event listener to handle answer selection
    });
}
// Function to reset the quiz state (clear previous question and answers)
function resetState() {
    nextButton.style.display = "none";// Hide the next button
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);// Remove previous answer buttons
    }
}
// Function to handle answer selection
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";// Checking if the selected answer is correct
    if (isCorrect) {
        selectedBtn.classList.add("correct");// Adding 'correct' class to the selected button
        score++;// Increment the score
    } else {
        selectedBtn.classList.add("incorrect");// Adding 'incorrect' class to the selected button
    }
    // Disable all answer buttons and display the next button
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";// Show the next button
}
// Function to display the final score
function showScore() {
    resetState();// Reset the state
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";// Changes the text of the next button
    nextButton.style.display = "block"; // Shows the next button
}
// Function to handle the next button click
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();// If there are more questions, this display the next question
    } else {
        showScore();// If all questions are answered, this display the final score
    }
}
// Event listener for the next button
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();// this handles next button click
    } else {
        startQuiz();// If all questions are answered, start the quiz again
    }
});
// hides the login 
authMessage.style.display = "none";