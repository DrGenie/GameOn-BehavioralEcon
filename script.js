/*****************************************************************************
 * Make sure all functions are global so "onclick" or event calls work.
 *****************************************************************************/
window.showUltimatumDiagram = showUltimatumDiagram;
window.simulateUltimatum = simulateUltimatum;

window.showTrustDiagram = showTrustDiagram;
window.simulateTrust = simulateTrust;

window.showPublicGoodsDiagram = showPublicGoodsDiagram;
window.simulatePublicGoods = simulatePublicGoods;

window.showSpeculativeDiagram = showSpeculativeDiagram;
window.simulateSpeculative = simulateSpeculative;

window.showRPSDiagram = showRPSDiagram;
window.simulateRPS = simulateRPS;

window.toggleQuiz = toggleQuiz;
window.checkAnswer = checkAnswer;
window.startCountdown = startCountdown;
window.pauseCountdown = pauseCountdown;

/*****************************************************************************
 * 1) ULTIMATUM GAME
 *****************************************************************************/

/** 
 * showUltimatumDiagram():
 *   Draw a base Ultimatum Game diagram with no highlights.
*/
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

      <!-- Reject Arrow -->
      <line class="rejectArrow" x1="320" y1="40" x2="400" y2="10"></line>
      <text x="360" y="18" fill="#000">Reject</text>

      <!-- Accept Arrow -->
      <line class="acceptArrow" x1="320" y1="40" x2="400" y2="70"></line>
      <text x="360" y="63" fill="#000">Accept</text>

      <!-- Payoff text -->
      <text x="410" y="10" fill="red" font-size="12">Payoffs = 0, 0</text>
      <text x="410" y="70" fill="blue" font-size="12">Payoffs = X, (10 - X)</text>
    </svg>
  `;
}

/**
 * simulateUltimatum():
 *   1) Redraw the base diagram.
 *   2) Highlight Accept or Reject arrow depending on the offer. 
 *      If offer < 4 => highlight reject (red).
 *      Else highlight accept (green).
 */
function simulateUltimatum() {
  showUltimatumDiagram(); // fresh draw

  // Retrieve slider value
  const offer = parseInt(document.getElementById('ultOffer').value, 10) || 0;
  const threshold = 4; // e.g., 40% fairness threshold

  const container = document.getElementById('ultimatumDiagram');
  const rejectLine = container.querySelector('.rejectArrow');
  const acceptLine = container.querySelector('.acceptArrow');

  // Clear old highlights
  rejectLine.classList.remove('highlightReject');
  acceptLine.classList.remove('highlightAccept');

  // If offer < threshold => reject
  if (offer < threshold) {
    rejectLine.classList.add('highlightReject');
  } else {
    acceptLine.classList.add('highlightAccept');
  }
}

/*****************************************************************************
 * 2) TRUST GAME
 *****************************************************************************/

/**
 * showTrustDiagram():
 *   Draws the base trust game diagram with placeholders for payoffs.
 */
function showTrustDiagram() {
  const container = document.getElementById('trustDiagram');
  container.innerHTML = `
    <svg width="500" height="220">
      <!-- Sender -->
      <rect x="20" y="80" width="80" height="40" fill="lightblue" rx="10" ry="10"></rect>
      <text x="60" y="105" text-anchor="middle" fill="#000">Sender</text>

      <!-- Arrow to tripled node -->
      <line x1="100" y1="100" x2="200" y2="100" stroke="black" stroke-width="2"></line>
      <text x="150" y="90" fill="#000">Sends X</text>

      <!-- Tripled node -->
      <rect x="200" y="80" width="110" height="40" fill="lightgreen" rx="10" ry="10"></rect>
      <text x="255" y="105" text-anchor="middle" fill="#000">Tripled: 3X</text>

      <!-- Arrow to Receiver -->
      <line x1="310" y1="100" x2="410" y2="100" stroke="black" stroke-width="2"></line>
      <text x="360" y="90" fill="#000">Transfer</text>

      <!-- Receiver -->
      <rect x="410" y="80" width="80" height="40" fill="lightpink" rx="10" ry="10"></rect>
      <text x="450" y="105" text-anchor="middle" fill="#000">Receiver</text>

      <!-- Payoff placeholders -->
      <text id="trustPayoffSender" x="50" y="180" fill="#000">Sender payoff = ?</text>
      <text id="trustPayoffReceiver" x="280" y="180" fill="#000">Receiver payoff = ?</text>
    </svg>
  `;
}

/**
 * simulateTrust():
 *   1) Redraw the base diagram.
 *   2) Compute payoffs based on X and fraction Y.
 *      - Amount Sent = X
 *      - Tripled => 3X
 *      - Receiver returns fraction f * (3X)
 *      - Sender payoff => (10 - X) + (f * 3X)
 *      - Receiver payoff => (3X * (1 - f))
 */
function simulateTrust() {
  showTrustDiagram();

  const xSent = parseInt(document.getElementById('trustSent').value, 10);
  const fracReturn = parseFloat(document.getElementById('trustReturn').value);

  // Payoff calculations
  const senderPayoff = (10 - xSent) + fracReturn * (3 * xSent);
  const receiverPayoff = (3 * xSent) - fracReturn * (3 * xSent);

  // Insert into the SVG text placeholders
  const container = document.getElementById('trustDiagram');
  const senderText = container.querySelector('#trustPayoffSender');
  const receiverText = container.querySelector('#trustPayoffReceiver');

  senderText.textContent = `Sender payoff = ${senderPayoff.toFixed(2)}`;
  receiverText.textContent = `Receiver payoff = ${receiverPayoff.toFixed(2)}`;
}

/*****************************************************************************
 * 3) PUBLIC GOODS GAME
 *****************************************************************************/

/**
 * showPublicGoodsDiagram():
 *   Draws a base circle (Public Pot) and four players.
 */
function showPublicGoodsDiagram() {
  const container = document.getElementById('publicGoodsDiagram');
  container.innerHTML = `
    <svg width="500" height="300">
      <circle cx="250" cy="150" r="30" fill="gold"></circle>
      <text x="250" y="155" text-anchor="middle" fill="#000">Public Pot</text>

      <rect x="80" y="40" width="60" height="30" fill="lightblue" rx="10" ry="10"></rect>
      <text x="110" y="60" text-anchor="middle" fill="#000">P1</text>

      <rect x="360" y="40" width="60" height="30" fill="lightblue" rx="10" ry="10"></rect>
      <text x="390" y="60" text-anchor="middle" fill="#000">P2</text>

      <rect x="80" y="230" width="60" height="30" fill="lightblue" rx="10" ry="10"></rect>
      <text x="110" y="250" text-anchor="middle" fill="#000">P3</text>

      <rect x="360" y="230" width="60" height="30" fill="lightblue" rx="10" ry="10"></rect>
      <text x="390" y="250" text-anchor="middle" fill="#000">P4</text>

      <line x1="140" y1="55" x2="220" y2="120" stroke="black" stroke-width="2"></line>
      <line x1="390" y1="55" x2="280" y2="120" stroke="black" stroke-width="2"></line>
      <line x1="140" y1="245" x2="220" y2="180" stroke="black" stroke-width="2"></line>
      <line x1="390" y1="245" x2="280" y2="180" stroke="black" stroke-width="2"></line>

      <text x="250" y="190" text-anchor="middle" fill="#000" font-size="14">
        Payoff = (Total in Pot) / (#Players)
      </text>

      <!-- Where we display final results -->
      <text id="pgResult" x="250" y="270" text-anchor="middle" fill="#000"></text>
    </svg>
  `;
}

/**
 * simulatePublicGoods():
 *   1) Redraw the base diagram.
 *   2) Sum the contributions from 4 sliders.
 *   3) Each player invests from their own 10. 
 *      We assume each player ends up with (10 - contribution) + share_of_pot.
 */
function simulatePublicGoods() {
  showPublicGoodsDiagram();

  // Grab slider values
  const p1 = parseInt(document.getElementById('pgP1').value, 10);
  const p2 = parseInt(document.getElementById('pgP2').value, 10);
  const p3 = parseInt(document.getElementById('pgP3').value, 10);
  const p4 = parseInt(document.getElementById('pgP4').value, 10);

  const totalPot = p1 + p2 + p3 + p4;
  const shareEach = totalPot / 4;

  // Final payoffs for each (assuming 10 initial for each player)
  const payoffP1 = (10 - p1) + shareEach;
  const payoffP2 = (10 - p2) + shareEach;
  const payoffP3 = (10 - p3) + shareEach;
  const payoffP4 = (10 - p4) + shareEach;

  const container = document.getElementById('publicGoodsDiagram');
  const resultText = container.querySelector('#pgResult');

  resultText.textContent =
    `Total Pot = ${totalPot}. P1:${payoffP1.toFixed(2)}, P2:${payoffP2.toFixed(2)}, ` +
    `P3:${payoffP3.toFixed(2)}, P4:${payoffP4.toFixed(2)}`;
}

/*****************************************************************************
 * 4) SPECULATIVE BUBBLES
 *****************************************************************************/

/**
 * showSpeculativeDiagram():
 *   Base bubble chart with a moderate peak.
 */
function showSpeculativeDiagram() {
  const container = document.getElementById('speculativeDiagram');
  container.innerHTML = drawBubblePolyline(5); // default hype=5
}

/**
 * simulateSpeculative():
 *   - Retrieves "bubbleHype" slider.
 *   - Re-draws the bubble chart with a bigger or smaller peak.
 */
function simulateSpeculative() {
  const hype = parseInt(document.getElementById('bubbleHype').value, 10);
  const container = document.getElementById('speculativeDiagram');
  container.innerHTML = drawBubblePolyline(hype);
}

/**
 * drawBubblePolyline(hype):
 *   Returns a string of <svg> code. The "peak" is scaled by hype.
 */
function drawBubblePolyline(hype) {
  // Base points for the bubble wave
  // We'll transform the vertical coordinate based on hype
  // Lower Y => higher on chart => bigger bubble
  // Example: y = baseY - hypeFactor
  const basePoints = [
    {x:50,  y:180}, 
    {x:100, y:150},
    {x:150, y:120},
    {x:200, y:80},
    {x:250, y:60},  // center peak
    {x:300, y:90},
    {x:350, y:130},
    {x:400, y:170},
    {x:450, y:190}
  ];

  // Adjust Y by hype => if hype=0 => shift minimal, if hype=10 => shift big
  const scaledPoints = basePoints.map(pt => {
    const shift = (10 - hype) * 3; // bigger hype => smaller shift => higher peak
    return { x: pt.x, y: pt.y + shift };
  });

  // Convert points to "x1,y1 x2,y2..."
  const polyPoints = scaledPoints.map(pt => `${pt.x},${pt.y}`).join(' ');

  return `
    <svg width="500" height="250">
      <!-- Axes -->
      <line x1="50" y1="200" x2="450" y2="200" stroke="black" stroke-width="2"></line>
      <line x1="50" y1="200" x2="50" y2="50" stroke="black" stroke-width="2"></line>

      <text x="440" y="215" fill="#000">Round</text>
      <text x="40" y="60" fill="#000" transform="rotate(-90, 40, 60)">Price</text>

      <!-- Bubble line (transformed by hype) -->
      <polyline fill="none" stroke="blue" stroke-width="2"
        points="${polyPoints}" />

      <text x="60" y="170" fill="blue">Early Rounds</text>
      <text x="240" y="70" fill="blue">Peak</text>
      <text x="410" y="180" fill="blue">Crash</text>
    </svg>
  `;
}

/*****************************************************************************
 * 5) ROCK-PAPER-SCISSORS
 *****************************************************************************/

/**
 * showRPSDiagram():
 *   Base diagram (Rock, Paper, Scissors).
 */
function showRPSDiagram() {
  const container = document.getElementById('rpsDiagram');
  container.innerHTML = drawRPS('none', 'none'); 
  // 'none','none' => no highlight
}

/**
 * simulateRPS():
 *   1) Get player's choice from <select>.
 *   2) Generate an opponent move (random or cyclical).
 *   3) Determine the winner and highlight the appropriate arrow in the diagram.
 */
function simulateRPS() {
  const player = document.getElementById('rpsChoice').value;
  const possibleMoves = ['rock','paper','scissors'];

  // For a simple approach, pick random:
  const opp = possibleMoves[Math.floor(Math.random() * 3)];

  // We'll highlight the arrow or show text if tie.
  let highlight = determineRPSWinner(player, opp);

  const container = document.getElementById('rpsDiagram');
  container.innerHTML = drawRPS(player, opp);

  // We could also show a small text overlay about the result
  const resultText = document.createElement('p');
  if (highlight === 'tie') {
    resultText.textContent = `Tie! You both chose ${player}.`;
    resultText.style.color = '#f39c12';
  } else if (highlight === 'player') {
    resultText.textContent = `You chose ${player}, opponent chose ${opp}. You win!`;
    resultText.style.color = '#27ae60';
  } else {
    resultText.textContent = `You chose ${player}, opponent chose ${opp}. You lose!`;
    resultText.style.color = '#c0392b';
  }
  container.appendChild(resultText);
}

/**
 * drawRPS(player, opp):
 *   Returns <svg> with potential highlights for the arrow that indicates who beats whom.
 *   If tie, we do nothing special, or could draw a note.
 */
function drawRPS(player, opp) {
  // Optionally, highlight edges if that helps. 
  // For simplicity, we'll just draw the base. We'll rely on text to show the outcome.
  return `
    <svg width="500" height="250">
      <!-- Rock Node -->
      <rect x="210" y="30" width="80" height="30" fill="${(player==='rock')?'#95a5a6':'lightgray'}" rx="10" ry="10"></rect>
      <text x="250" y="50" text-anchor="middle" fill="#000">Rock</text>

      <!-- Paper Node -->
      <rect x="60" y="180" width="80" height="30" fill="${(player==='paper')?'#2ecc71':'lightgreen'}" rx="10" ry="10"></rect>
      <text x="100" y="200" text-anchor="middle" fill="#000">Paper</text>

      <!-- Scissors Node -->
      <rect x="360" y="180" width="80" height="30" fill="${(player==='scissors')?'#e056fd':'lightpink'}" rx="10" ry="10"></rect>
      <text x="400" y="200" text-anchor="middle" fill="#000">Scissors</text>

      <!-- Arrows -->
      <line x1="250" y1="60" x2="100" y2="180" stroke="black" stroke-width="2"></line>
      <text x="170" y="120" fill="#000" font-size="12" transform="rotate(-45,170,120)">Covers</text>

      <line x1="100" y1="180" x2="400" y2="180" stroke="black" stroke-width="2"></line>
      <text x="250" y="170" fill="#000">Cuts</text>

      <line x1="400" y1="180" x2="250" y2="60" stroke="black" stroke-width="2"></line>
      <text x="320" y="110" fill="#000" font-size="12" transform="rotate(45,320,110)">Crushes</text>

      <!-- Opponent highlight -->
      <text x="210" y="110" fill="#000">Opponent chose: ${opp}</text>
    </svg>
  `;
}

/**
 * determineRPSWinner(player, opp):
 *   Return 'player','opp','tie' to indicate who wins.
 */
function determineRPSWinner(player, opp) {
  if (player === opp) return 'tie';
  if (
    (player === 'rock' && opp === 'scissors') ||
    (player === 'scissors' && opp === 'paper') ||
    (player === 'paper' && opp === 'rock')
  ) {
    return 'player';
  } else {
    return 'opp';
  }
}

/*****************************************************************************
 * 6) QUIZ LOGIC
 *****************************************************************************/
function toggleQuiz(quizId) {
  const quiz = document.getElementById(quizId);
  quiz.classList.toggle('hidden');
  // Clear feedback
  const feedback = quiz.querySelector('.feedback');
  if (feedback) feedback.textContent = '';
}

function checkAnswer(quizId, choice, message, isCorrect) {
  const quiz = document.getElementById(quizId);
  const feedback = quiz.querySelector('.feedback');
  feedback.textContent = message;
  feedback.style.color = isCorrect ? '#27ae60' : '#e74c3c';
}

/*****************************************************************************
 * 7) COUNTDOWN TIMER (used by Trust, Speculative)
 *****************************************************************************/
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

/*****************************************************************************
 * Slider Value Display Handlers
 *   We attach eventListeners so the <span> updates whenever slider moves.
 *****************************************************************************/
const ultSlider = document.getElementById('ultOffer');
const ultValue = document.getElementById('offerValue');
if (ultSlider && ultValue) {
  ultSlider.addEventListener('input', () => {
    ultValue.textContent = ultSlider.value;
  });
}

const trustSentSlider = document.getElementById('trustSent');
const trustSentSpan = document.getElementById('trustSentValue');
if (trustSentSlider && trustSentSpan) {
  trustSentSlider.addEventListener('input', () => {
    trustSentSpan.textContent = trustSentSlider.value;
  });
}

const trustReturnSlider = document.getElementById('trustReturn');
const trustReturnSpan = document.getElementById('trustReturnValue');
if (trustReturnSlider && trustReturnSpan) {
  trustReturnSlider.addEventListener('input', () => {
    trustReturnSpan.textContent = trustReturnSlider.value;
  });
}

const pgSliders = [
  {id:'pgP1', span:'pgP1Value'},
  {id:'pgP2', span:'pgP2Value'},
  {id:'pgP3', span:'pgP3Value'},
  {id:'pgP4', span:'pgP4Value'},
];
pgSliders.forEach(s => {
  const slider = document.getElementById(s.id);
  const span = document.getElementById(s.span);
  if (slider && span) {
    slider.addEventListener('input', () => {
      span.textContent = slider.value;
    });
  }
});

const bubbleSlider = document.getElementById('bubbleHype');
const bubbleSpan = document.getElementById('bubbleHypeValue');
if (bubbleSlider && bubbleSpan) {
  bubbleSlider.addEventListener('input', () => {
    bubbleSpan.textContent = bubbleSlider.value;
  });
}
