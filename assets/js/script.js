const questions = [
  {
    question: "What is your name?",
    answers:[
      {text: "Andres", correct: true},
      {text: "Eduardo", correct: false},
      {text: "Mejia", correct: false},
      {text: "Julio", correct: false},
    ]
  },
  {
    question: "What is your name?asdasd",
    answers:[
      {text: "Andres", correct: true},
      {text: "Eduardo", correct: false},
      {text: "Mejia", correct: false},
      {text: "Fereira", correct: false},
    ]
  },
  {
    question: "What is your name?",
    answers:[
      {text: "Andres", correct: true},
      {text: "Eduardo", correct: false},
      {text: "Mejia", correct: false},
      {text: "Fereira", correct: false},
    ]
  },
  {
    question: "What is your name?",
    answers:[
      {text: "Andres", correct: true},
      {text: "Eduardo", correct: false},
      {text: "Mejia", correct: false},
      {text: "Fereira", correct: false},
    ]
  },
  {
    question: "What is your name?",
    answers:[
      {text: "Andres", correct: true},
      {text: "Eduardo", correct: false},
      {text: "Mejia", correct: false},
      {text: "Fereira", correct: false},
    ]
  }
];

const start = document.getElementById("start");
const startButton = document.getElementById("start-button");
const app = document.getElementById("app");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const submitBtn = document.getElementById("submit-btn");
const againBtn = document.getElementById("again-btn");
const deleteBtn = document.getElementById("delete-btn");
const buttonContainer = document.getElementById("button-container")
const timerElement = document.getElementById("time-left");
const initialsIn = document.getElementById("initials-input");
const initialsContainer = document.getElementById("input-container")
const results = [];
const table = document.getElementById("table");


let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 5;
let timerInterval;

/* WELCOME TO THE QUIZ WINDOWS */
function startQuiz(){
  submitBtn.style.display = "none"
  start.style.display = "none";
  againBtn.style.display = "none";
  initialsIn.style.display = "none";
  app.style.display = "block";
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
  timerInterval = setInterval(updateTimer, 1000);
}

/* SHOW QUESTION CARD */
function showQuestion(){
  resetState();
  table.style.display = "none";
  buttonContainer.style.display = "none";
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if(answer.correct){
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState(){
  nextButton.style.display = "none";
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

/* SELECTING ANSWER CORRECT OR INCORRECT */
function selectAnswer(e){
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if(isCorrect){
    selectedBtn.classList.add("correct");
    score++;
  }else{
    selectedBtn.classList.add("incorrect");
    timeLeft = timeLeft - 10;
  }

  Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct === "true"){
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

/* SHOW USER SCORE */
function showScore(){
  resetState();
  currentQuestionIndex=0;
  questionElement.innerHTML = "You Score: "+score;
  let initials = document.createElement("label");
  let br = document.createElement("br");
  initials.innerHTML = "Enter initials: ";
  questionElement.append(br);
  questionElement.append(initials);
  initialsContainer.style.display = "flex";
  initialsIn.style.display = "block";
  initialsContainer.style.justifyContent = "center"
  submitBtn.style.display = "block";
  submitBtn.innerHTML = "Submit";
  clearInterval(timerInterval); // Stop the timer
  timeLeft = 60;
}

submitBtn.addEventListener("click", function(event) {
  event.preventDefault();
  
  let userInfo = {
    score: score,
    initials: initialsIn.value,
  };

  results.push(userInfo);
  
  localStorage.setItem("userInfo", JSON.stringify(userInfo));
  showList();
  
  });

  /* ADDING EACH SCORE IN A TABLE */
function generateList(){
  table.style.display = "flex";
  table.style.justifyContent = "center";
  var html = "<table boder = '1|1'>"

    html += "<thead>";
    html += "<tr>";
    html += "<td>"+"Score"+"</td>";
    html += "<td>"+"Initials"+"</td>";
    html += "</thead>";
  for(var i = 0; i < results.length;i++){
    html += "<tr>";
    html += "<td>"+results[i].score+"</td>";
    html += "<td>"+results[i].initials+"</td>";
    html += "</tr>";
  }
  document.getElementById("table").innerHTML = html;
}

/* SCORE LIST */
function showList(){
  initialsIn.style.display = "none";
  console.log(results);
  questionElement.innerHTML = "Score History"
  generateList();
  submitBtn.style.display = "none";
  buttonContainer.style.display = "flex"
  againBtn.style.display = "block";
  againBtn.innerHTML = "Play Again";
  deleteBtn.style.display = "flex";
  deleteBtn.innerHTML = "Delete Score";
}
againBtn.addEventListener("click", startQuiz);
deleteBtn.addEventListener("click", deleteScore);


/* DELETE SCORE HISTORY*/
function deleteScore(){
  results.splice(0,results.length);
  showList();
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

function updateTimer() {
  if (timeLeft > 0) {
      timeLeft--;
      timerElement.textContent = `Timer: ${timeLeft} seconds`;
  } else {
      showScore();
      
  }
}

/* function endQuiz() {
  clearInterval(timerInterval); // Stop the timer
  currentQuestionIndex = 0;
  showScore();
} */


startButton.addEventListener("click", startQuiz);