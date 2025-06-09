const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        correct: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Jupiter", "Mars", "Venus", "Mercury"],
        correct: "Mars"
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correct: "4"
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
        correct: "William Shakespeare"
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic", "Indian", "Arctic", "Pacific"],
        correct: "Pacific"
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;
let timeLeft = 30;
let timer;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const feedbackEl = document.getElementById('feedback');
const scoreEl = document.getElementById('score');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const timerEl = document.getElementById('timer');
const progressBar = document.getElementById('progress-bar');

function startTimer() {
    timeLeft = 30;
    timerEl.textContent = `Time: ${timeLeft}s`;
    timerEl.classList.remove('warning');
    progressBar.style.width = '100%';
    progressBar.style.background = '#007bff';
    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = `Time: ${timeLeft}s`;
        progressBar.style.width = `${(timeLeft / 30) * 100}%`;
        if (timeLeft <= 10) {
            timerEl.classList.add('warning');
            progressBar.style.background = '#dc3545';
        }
        if (timeLeft <= 0) {
            clearInterval(timer);
            if (!answered) {
                selectOption(null); // Auto-submit as incorrect
            }
        }
    }, 1000);
}

function loadQuestion() {
    clearInterval(timer);
    startTimer();
    const q = quizData[currentQuestion];
    questionEl.textContent = q.question;
    optionsEl.innerHTML = '';
    q.options.forEach(option => {
        const div = document.createElement('div');
        div.classList.add('option');
        div.textContent = option;
        div.addEventListener('click', () => selectOption(option));
        optionsEl.appendChild(div);
    });
    feedbackEl.textContent = '';
    nextBtn.style.display = 'none';
    answered = false;
}

function selectOption(selected) {
    if (answered) return;
    answered = true;
    clearInterval(timer);
    const q = quizData[currentQuestion];
    const options = optionsEl.children;
    for (let i = 0; i < options.length; i++) {
        options[i].classList.add(options[i].textContent === q.correct ? 'correct' : 'incorrect');
        if (options[i].textContent === selected) {
            options[i].classList.add('selected');
        }
        options[i].style.pointerEvents = 'none';
    }
    if (selected === q.correct) {
        feedbackEl.textContent = 'Correct!';
        feedbackEl.style.color = '#28a745';
        score++;
        scoreEl.textContent = score;
    } else {
        feedbackEl.textContent = selected ? 
            `Incorrect. The correct answer is ${q.correct}.`: 
            `Time's up! The correct answer is ${q.correct}.`;
        feedbackEl.style.color = '#dc3545';
    }
    nextBtn.style.display = 'block';
}

function showResults() {
    clearInterval(timer);
    questionEl.textContent = 'Quiz Completed!';
    optionsEl.innerHTML = '';
    timerEl.style.display = 'none';
    progressBar.parentElement.style.display = 'none';
    feedbackEl.textContent = `Your final score is ${score} out of ${quizData.length}.`;
    feedbackEl.style.color = '#333';
    nextBtn.style.display = 'none';
    restartBtn.style.display = 'block';
}
nextBtn.addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
});

restartBtn.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    scoreEl.textContent = score;
    timerEl.style.display = 'block';
    progressBar.parentElement.style.display = 'block';
    restartBtn.style.display = 'none';
    loadQuestion();
});
// Initialize quiz
loadQuestion();
