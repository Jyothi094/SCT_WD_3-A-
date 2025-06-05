const questions = [
  {
    type: 'multiple-choice',
    question: 'What is the capital of France?',
    options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
    answer: 'Paris'
  },
  {
    type: 'fill-in-the-blank',
    question: 'The largest ocean on Earth is the ____ Ocean.',
    answer: 'Pacific'
  },
  {
    type: 'multi-select',
    question: 'Which of the following are programming languages?',
    options: ['Python', 'HTML', 'JavaScript', 'CSS'],
    answer: ['Python', 'JavaScript']
  }
];

let currentQuestionIndex = 0;
let score = 0;

function displayQuestion() {
  const question = questions[currentQuestionIndex];
  const questionContainer = document.getElementById('question-container');
  const optionsContainer = document.getElementById('options-container');
  const nextBtn = document.getElementById('next-btn');
  const resultContainer = document.getElementById('result-container');

  questionContainer.textContent = question.question;
  optionsContainer.innerHTML = '';
  resultContainer.textContent = '';

  if (question.type === 'multiple-choice') {
    question.options.forEach(option => {
      const label = document.createElement('label');
      label.innerHTML = `
        <input type="radio" name="option" value="${option}"> ${option}
      `;
      optionsContainer.appendChild(label);
    });
  } else if (question.type === 'fill-in-the-blank') {
    optionsContainer.innerHTML = `
      <input type="text" id="answer-input" placeholder="Your answer">
    `;
  } else if (question.type === 'multi-select') {
    question.options.forEach(option => {
      const label = document.createElement('label');
      label.innerHTML = `
        <input type="checkbox" name="option" value="${option}"> ${option}
      `;
      optionsContainer.appendChild(label);
    });
  }

  nextBtn.style.display = 'inline-block';
}

function nextQuestion() {
  const question = questions[currentQuestionIndex];
  const nextBtn = document.getElementById('next-btn');
  const resultContainer = document.getElementById('result-container');

  let userAnswer = '';
  if (question.type === 'multiple-choice') {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption) {
      userAnswer = selectedOption.value;
    }
  } else if (question.type === 'fill-in-the-blank') {
    const answerInput = document.getElementById('answer-input');
    userAnswer = answerInput.value.trim();
  } else if (question.type === 'multi-select') {
    const selectedOptions = Array.from(document.querySelectorAll('input[name="option"]:checked'))
      .map(input => input.value);
    userAnswer = selectedOptions;
  }

  if (Array.isArray(userAnswer)) {
    if (userAnswer.length === question.answer.length &&
        userAnswer.every(ans => question.answer.includes(ans))) {
      score++;
    }
  } else if (userAnswer.toLowerCase() === question.answer.toLowerCase()) {
    score++;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    nextBtn.style.display = 'none';
    resultContainer.textContent = `Your score: ${score} out of ${questions.length}`;
  }
}

displayQuestion();
