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

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-btn");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion(){
    reserState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.Text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function reserState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>  {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    reserState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "Block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();