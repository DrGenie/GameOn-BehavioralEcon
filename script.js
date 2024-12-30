/************************************************************************
 * 1. DIAGRAMS (SVG Generation)
 ************************************************************************/

// 1. Ultimatum Game Diagram
function showUltimatumDiagram() {
  const container = document.getElementById('ultimatumDiagram');
  container.innerHTML = `
    <svg width="500" height="200">
      <!-- Proposer Node -->
      <rect x="20" y="20" width="100" height="40" fill="lightblue" rx="10" ry="10"></rect>
      <text x="70" y="45" text-anchor="middle" fill="#000">Proposer</text>

      <!-- Offer Arrow -->
      <line x1="120" y1="40" x2="220" y2="40" stroke="black" stroke-width="2"></line>
      <text x="170" y="30" text-anchor="middle" fill="#000">Offer X</text>

      <!-- Responder Node -->
      <rect x="220" y="20" width="100" height="40" fill="lightgreen" rx="10" ry="10"></rect>
      <text x="270" y="45" text-anchor="middle" fill="#000">Responder</text>

      <!-- Accept & Reject Arrows -->
      <line x1="320" y1="40" x2="400" y2="10" stroke="black" stroke-width="2"></line>
      <text x="360" y="18" fill="#000">Reject</text>

      <line x1="320" y1="40" x2="400" y2="70" stroke="black" stroke-width="2"></line>
      <text x="360" y="63" fill="#000">Accept</text>

      <!-- Payoff text -->
      <text x="410" y="10" fill="red" font-size="12">Payoff = 0, 0</text>
      <text x="410" y="70" fill="blue" font-size="12">Payoff = X, (10 - X)</text>
    </svg>
  `;
}

// 2. Trust Game Diagram
function showTrustDiagram() {
  const container = document.getElementById('trustDiagram');
  container.innerHTML = `
    <svg width="500" height="200">
      <!-- Sender -->
      <rect x="20" y="80" width="80" height="40" fill="lightblue" rx="10" ry="10"></rect>
      <text x="60" y="105" text-anchor="middle" fill="#000">Sender</text>

      <!-- Arrow to tripled node -->
      <line x1="100" y1="100" x2="200" y2="100" stroke="black" stroke-width="2"></line>
      <text x="150" y="90" fill="#000">Sends X</text>

      <!-- Tripled node -->
      <rect x="200" y="80" width="100" height="40" fill="lightgreen" rx="10" ry="10"></rect>
      <text x="250" y="105" text-anchor="middle" fill="#000">Tripled: 3X</text>

      <!-- Arrow to Receiver -->
      <line x1="300" y1="100" x2="400" y2="100" stroke="black" stroke-width="2"></line>
      <text x="350" y="90" fill="#000">Transfer</text>

      <!-- Receiver -->
      <rect x="400" y="80" width="80" height="40" fill="lightpink" rx="10" ry="10"></rect>
      <text x="440" y="105" text-anchor="middle" fill="#000">Receiver</text>

      <!-- Payoff notes -->
      <text x="120" y="150" fill="#000">Sender payoff = (Initial - X) + Y</text>
      <text x="300" y="150" fill="#000">Receiver payoff = 3X - Y</text>
    </svg>
  `;
}

// 3. Public Goods Diagram
function showPublicGoodsDiagram() {
  const container = document.getElementById('publicGoodsDiagram');
  container.innerHTML = `
    <svg width="500" height="300">
      <!-- Public Pot -->
      <circle cx="250" cy="150" r="30" fill="gold"></circle>
      <text x="250" y="155" text-anchor="middle" fill="#000">Public Pot</text>

      <!-- P1 -->
      <rect x="80" y="40" width="60" height="30" fill="lightblue" rx="10" ry="10"></rect>
      <text x="110" y="60" text-anchor="middle" fill="#000">P1</text>

      <!-- P2 -->
      <rect x="360" y="40" width="60" height="30" fill="lightblue" rx="10" ry="10"></rect>
      <text x="390" y="60" text-anchor="middle" fill="#000">P2</text>

      <!-- P3 -->
      <rect x="80" y="230" width="60" height="30" fill="lightblue" rx="10" ry="10"></rect>
      <text x="110" y="250" text-anchor="middle" fill="#000">P3</text>

      <!-- P4 -->
      <rect x="360" y="230" width="60" height="30" fill="lightblue" rx="10" ry="10"></rect>
      <text x="390" y="250" text-anchor="middle" fill="#000">P4</text>

      <!-- Arrows to Pot -->
      <line x1="140" y1="55" x2="220" y2="120" stroke="black" stroke-width="2"></line>
      <line x1="390" y1="55" x2="280" y2="120" stroke="black" stroke-width="2"></line>
      <line x1="140" y1="245" x2="220" y2="180" stroke="black" stroke-width="2"></line>
      <line x1="390" y1="245" x2="280" y2="180" stroke="black" stroke-width="2"></line>

      <text x="250" y="190" text-anchor="middle" fill="#000" font-size="14">
        Payoff = (Total in Pot) / (#Players)
      </text>
    </svg>
  `;
}

// 4. Speculative Bubbles Diagram
function showSpeculativeDiagram() {
  const container = document.getElementById('speculativeDiagram');
  container.innerHTML = `
    <svg width="500" height="250">
      <!-- Axes -->
      <line x1="50" y1="200" x2="450" y2="200" stroke="black" stroke-width="2"></line>
      <line x1="50" y1="200" x2="50" y2="50" stroke="black" stroke-width="2"></line>

      <!-- X-axis label -->
      <text x="440" y="215" fill="#000">Round</text>
      <!-- Y-axis label -->
      <text x="40" y="60" fill="#000" transform="rotate(-90, 40, 60)">Price</text>

      <!-- Bubble line (simple wave) -->
      <polyline fill="none" stroke="blue" stroke-width="2"
        points="50,180 100,150 150,120 200,80 250,60 300,90 350,130 400,170 450,190" />

      <!-- Labels -->
      <text x="60" y="170" fill="blue">Early Rounds</text>
      <text x="240" y="70" fill="blue">Peak</text>
      <text x="410" y="180" fill="blue">Crash</text>
    </svg>
  `;
}

// 5. Rock-Paper-Scissors Diagram
function showRPSDiagram() {
  const container = document.getElementById('rpsDiagram');
  container.innerHTML = `
    <svg width="500" height="250">
      <!-- Rock Node -->
      <rect x="210" y="30" width="80" height="30" fill="lightgray" rx="10" ry="10"></rect>
      <text x="250" y="50" text-anchor="middle" fill="#000">Rock</text>

      <!-- Paper Node -->
      <rect x="60" y="180" width="80" height="30" fill="lightgreen" rx="10" ry="10"></rect>
      <text x="100" y="200" text-anchor="middle" fill="#000">Paper</text>

      <!-- Scissors Node -->
      <rect x="360" y="180" width="80" height="30" fill="lightpink" rx="10" ry="10"></rect>
      <text x="400" y="200" text-anchor="middle" fill="#000">Scissors</text>

      <!-- Lines -->
      <line x1="250" y1="60" x2="100" y2="180" stroke="black" stroke-width="2"></line>
      <text x="170" y="120" fill="#000" font-size="12" transform="rotate(-45,170,120)">Covers</text>

      <line x1="100" y1="180" x2="400" y2="180" stroke="black" stroke-width="2"></line>
      <text x="250" y="170" fill="#000">Cuts</text>

      <line x1="400" y1="180" x2="250" y2="60" stroke="black" stroke-width="2"></line>
      <text x="330" y="110" fill="#000" font-size="12" transform="rotate(45,330,110)">Crushes</text>
    </svg>
  `;
}


/************************************************************************
 * 2. QUIZ LOGIC
 ************************************************************************/

function toggleQuiz(quizId) {
  const quiz = document.getElementById(quizId);
  quiz.classList.toggle('hidden');
  // Clear any existing feedback
  const feedback = quiz.querySelector('.feedback');
  if(feedback) feedback.textContent = '';
}

function checkAnswer(quizId, option, correctOption, message) {
  const quiz = document.getElementById(quizId);
  const feedback = quiz.querySelector('.feedback');
  if (option === 'a' || option === 'b' || option === 'c') {
    // If the user picked the correct answer
    if (document.querySelector(`[onclick*="${quizId}"][onclick*="'${option}'"]`).textContent.includes(correctOption)) {
      feedback.style.color = '#27ae60'; // green
    } else {
      feedback.style.color = '#e74c3c'; // red
    }
    feedback.textContent = message;
  }
}


/************************************************************************
 * 3. COUNTDOWN TIMER LOGIC (for Trust Game & Speculative Bubbles)
 ************************************************************************/

let countdownInterval;
let currentTime;

function startCountdown(timerId, seconds) {
  currentTime = seconds;
  const timerDisplay = document.getElementById(timerId);
  timerDisplay.textContent = currentTime;

  clearInterval(countdownInterval);
  countdownInterval = setInterval(() => {
    currentTime--;
    timerDisplay.textContent = currentTime;
    if (currentTime <= 0) {
      clearInterval(countdownInterval);
      timerDisplay.textContent = "Time's up!";
    }
  }, 1000);
}

function pauseCountdown() {
  clearInterval(countdownInterval);
}


/************************************************************************
 * 4. IDEAS FOR REAL-TIME DATA COLLECTION & REFLECTION
 ************************************************************************/
/*
 - Use a Google Form or Kahoot to gather each round’s offers or moves. 
 - Display aggregated results with a quick chart or reading them back in class.
 - Direct students to GitHub Discussions to post reactions:
     "What cultural norms shaped your Ultimatum Game decisions?"
     "Did you trust more or less after seeing returns in previous rounds?"
 - Insert 'creative twist' for Speculative Bubbles, e.g.:
     "Breaking News: The watch brand you’re trading is under investigation!"
     See if prices instantly drop.
 - Encourage Reflection Reports: 
     "Which biases (anchoring, fairness, reciprocity, herd behavior) influenced your decisions?"
     "Are you more rational after witnessing the bubble burst?"
*/
