/*****************************************************************************
 * 1) Make sure all functions are global so inline "onclick" calls work.
 *****************************************************************************/
window.showUltimatumDiagram = showUltimatumDiagram;
window.simulateUltimatum = simulateUltimatum;
window.simulateUltimatumRound2 = simulateUltimatumRound2;

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
 * GSAP Helper: animateArrow()
 *  - Applies a quick 'pulse' animation to highlight an arrow with color.
 *****************************************************************************/
function animateArrow(selector, highlightClass) {
  // Use GSAP to do a quick scale or color flash
  gsap.fromTo(selector, {scale: 0.8}, {
    duration: 0.5,
    scale: 1,
    repeat: 1,
    yoyo: true
  });
  // Also ensure we add the highlight class if needed
  const el = document.querySelector(selector);
  if(el) el.classList.add(highlightClass);
}

/*****************************************************************************
 * 2) ULTIMATUM GAME
 *****************************************************************************/

/* Show base diagram with no highlights. */
function showUltimatumDiagram() {
  const container = document.getElementById('ultimatumDiagram');
  container.innerHTML = `
    <svg width="500" height="200">
      <rect x="20" y="20" width="100" height="40" fill="lightblue" rx="10" ry="10"></rect>
      <text x="70" y="45" text-anchor="middle">Proposer</text>

      <line x1="120" y1="40" x2="220" y2="40" stroke="#7f8c8d" stroke-width="2"></line>
      <text x="170" y="30" text-anchor="middle">Offer X</text>

      <rect x="220" y="20" width="100" height="40" fill="lightgreen" rx="10" ry="10"></rect>
      <text x="270" y="45" text-anchor="middle">Responder</text>

      <!-- Arrows -->
      <line class="rejectArrow" x1="320" y1="40" x2="400" y2="10"></line>
      <text x="360" y="18">Reject</text>

      <line class="acceptArrow" x1="320" y1="40" x2="400" y2="70"></line>
      <text x="360" y="63">Accept</text>

      <text x="410" y="10" fill="red" font-size="12">Payoffs=0,0</text>
      <text x="410" y="70" fill="blue" font-size="12">Payoffs=X,(10-X)</text>
    </svg>
  `;
}

/* Basic threshold = 4 (40%). */
function simulateUltimatum() {
  showUltimatumDiagram();
  const offer = parseInt(document.getElementById('ultOffer').value) || 0;
  const threshold = 4;

  if (offer < threshold) {
    animateArrow('.rejectArrow', 'highlightReject');
  } else {
    animateArrow('.acceptArrow', 'highlightAccept');
  }
}

/* Round 2 threshold = 5 (50%). */
function simulateUltimatumRound2() {
  showUltimatumDiagram();
  const offer = parseInt(document.getElementById('ultOffer').value) || 0;
  const threshold = 5;

  if (offer < threshold) {
    animateArrow('.rejectArrow', 'highlightReject');
  } else {
    animateArrow('.acceptArrow', 'highlightAccept');
  }
}

/*****************************************************************************
 * 3) TRUST GAME
 *****************************************************************************/
function showTrustDiagram() {
  const container = document.getElementById('trustDiagram');
  container.innerHTML = `
    <svg width="500" height="220">
      <rect x="20" y="80" width="80" height="40" fill="lightblue" rx="10" ry="10"></rect>
      <text x="60" y="105" text-anchor="middle">Sender</text>

      <line x1="100" y1="100" x2="200" y2="100" stroke="#7f8c8d" stroke-width="2"></line>
      <text x="150" y="90">Sends X</text>

      <rect x="200" y="80" width="110" height="40" fill="lightgreen" rx="10" ry="10"></rect>
      <text x="255" y="105" text-anchor="middle">Tripled: 3X</text>

      <line x1="310" y1="100" x2="410" y2="100" stroke="#7f8c8d" stroke-width="2"></line>
      <text x="360" y="90">Transfer</text>

      <rect x="410" y="80" width="80" height="40" fill="lightpink" rx="10" ry="10"></rect>
      <text x="450" y="105" text-anchor="middle">Receiver</text>

      <!-- Payoff placeholders -->
      <text id="trustPayoffSender" x="50" y="180">Sender=?</text>
      <text id="trustPayoffReceiver" x="280" y="180">Receiver=?</text>
    </svg>
  `;
}

function simulateTrust() {
  showTrustDiagram();
  const xSent = parseInt(document.getElementById('trustSent').value);
  const fracReturn = parseFloat(document.getElementById('trustReturn').value);

  const senderPayoff = (10 - xSent) + (fracReturn * 3 * xSent);
  const receiverPayoff = (3 * xSent) - (fracReturn * 3 * xSent);

  const container = document.getElementById('trustDiagram');
  container.querySelector('#trustPayoffSender').textContent = 
    `Sender=${senderPayoff.toFixed(2)}`;
  container.querySelector('#trustPayoffReceiver').textContent = 
    `Receiver=${receiverPayoff.toFixed(2)}`;

  // Animate text with GSAP
  gsap.fromTo("#trustPayoffSender, #trustPayoffReceiver", 
    {opacity:0, y:20}, 
    {opacity:1, y:0, duration:0.8});
}

/*****************************************************************************
 * 4) PUBLIC GOODS
 *****************************************************************************/
function showPublicGoodsDiagram() {
  const container = document.getElementById('publicGoodsDiagram');
  container.innerHTML = `
    <svg width="500" height="300">
      <circle cx="250" cy="150" r="30" fill="gold"></circle>
      <text x="250" y="155" text-anchor="middle">Public Pot</text>

      <rect x="80" y="40" width="60" height="30" fill="lightblue" rx="10" ry="10"></rect>
      <text x="110" y="60" text-anchor="middle">P1</text>

      <rect x="360" y="40" width="60" height="30" fill="lightblue" rx="10" ry="10"></rect>
      <text x="390" y="60" text-anchor="middle">P2</text>

      <rect x="80" y="230" width="60" height="30" fill="lightblue" rx="10" ry="10"></rect>
      <text x="110" y="250" text-anchor="middle">P3</text>

      <rect x="360" y="230" width="60" height="30" fill="lightblue" rx="10" ry="10"></rect>
      <text x="390" y="250" text-anchor="middle">P4</text>

      <line x1="140" y1="55" x2="220" y2="120" stroke="#7f8c8d" stroke-width="2"></line>
      <line x1="390" y1="55" x2="280" y2="120" stroke="#7f8c8d" stroke-width="2"></line>
      <line x1="140" y1="245" x2="220" y2="180" stroke="#7f8c8d" stroke-width="2"></line>
      <line x1="390" y1="245" x2="280" y2="180" stroke="#7f8c8d" stroke-width="2"></line>

      <text x="250" y="190" text-anchor="middle" font-size="14">
        Payoff = (Total in Pot) / 4
      </text>

      <text id="pgResult" x="250" y="270" text-anchor="middle" fill="#2c3e50"></text>
    </svg>
  `;
}

function simulatePublicGoods() {
  showPublicGoodsDiagram();
  const p1 = parseInt(document.getElementById('pgP1').value);
  const p2 = parseInt(document.getElementById('pgP2').value);
  const p3 = parseInt(document.getElementById('pgP3').value);
  const p4 = parseInt(document.getElementById('pgP4').value);

  const totalPot = p1 + p2 + p3 + p4;
  const share = totalPot / 4;
  const payoffP1 = (10 - p1) + share;
  const payoffP2 = (10 - p2) + share;
  const payoffP3 = (10 - p3) + share;
  const payoffP4 = (10 - p4) + share;

  const container = document.getElementById('publicGoodsDiagram');
  const result = container.querySelector('#pgResult');
  result.textContent = 
    `Total Pot=${totalPot}, P1=${payoffP1.toFixed(2)}, P2=${payoffP2.toFixed(2)}, ` +
    `P3=${payoffP3.toFixed(2)}, P4=${payoffP4.toFixed(2)}`;

  gsap.fromTo("#pgResult", {opacity:0}, {opacity:1, duration:0.5});
}

/*****************************************************************************
 * 5) SPECULATIVE BUBBLES
 *****************************************************************************/
function showSpeculativeDiagram() {
  const container = document.getElementById('speculativeDiagram');
  container.innerHTML = drawBubblePolyline(5);
}

function simulateSpeculative() {
  const hype = parseInt(document.getElementById('bubbleHype').value);
  const container = document.getElementById('speculativeDiagram');
  container.innerHTML = drawBubblePolyline(hype);

  // Animate the polyline
  gsap.fromTo("#bubbleline", {drawSVG:"0%"}, {drawSVG:"100%", duration:1.5, ease:"power2.inOut"});
}

/* Return an SVG string with a wave adjusted by 'hype'. */
function drawBubblePolyline(hype) {
  // base wave points
  const basePoints = [
    {x:50,  y:180},
    {x:100, y:150},
    {x:150, y:120},
    {x:200, y:80},
    {x:250, y:60},
    {x:300, y:90},
    {x:350, y:130},
    {x:400, y:170},
    {x:450, y:190}
  ];
  // Shift the peak based on hype
  const scaledPoints = basePoints.map(pt => {
    const shift = (10 - hype) * 3;
    return { x: pt.x, y: pt.y + shift };
  });
  const polyPoints = scaledPoints.map(pt => `${pt.x},${pt.y}`).join(' ');

  return `
    <svg width="500" height="250">
      <line x1="50" y1="200" x2="450" y2="200" stroke="#7f8c8d" stroke-width="2"></line>
      <line x1="50" y1="200" x2="50" y2="50" stroke="#7f8c8d" stroke-width="2"></line>

      <text x="440" y="215">Round</text>
      <text x="40" y="60" transform="rotate(-90, 40, 60)">Price</text>

      <polyline id="bubbleline" fill="none" stroke="#2980b9" stroke-width="2"
        points="${polyPoints}" />

      <text x="60" y="170" fill="#2980b9">Early Rounds</text>
      <text x="240" y="70" fill="#2980b9">Peak</text>
      <text x="410" y="180" fill="#2980b9">Crash</text>
    </svg>
  `;
}

/*****************************************************************************
 * 6) ROCK-PAPER-SCISSORS
 *****************************************************************************/
function showRPSDiagram() {
  const container = document.getElementById('rpsDiagram');
  container.innerHTML = drawRPS('none','none');
}

function simulateRPS() {
  const player = document.getElementById('rpsChoice').value;
  const moves = ['rock','paper','scissors'];
  const opp = moves[Math.floor(Math.random() * 3)];
  const result = determineRPSWinner(player, opp);

  const container = document.getElementById('rpsDiagram');
  container.innerHTML = drawRPS(player, opp);

  const p = document.createElement('p');
  if (result==='tie') {
    p.textContent = `Tie! You both chose ${player}.`;
    p.style.color = '#f39c12';
  } else if (result==='player') {
    p.textContent = `You chose ${player}, Opponent chose ${opp}. You win!`;
    p.style.color = '#27ae60';
  } else {
    p.textContent = `You chose ${player}, Opponent chose ${opp}. You lose!`;
    p.style.color = '#c0392b';
  }
  container.appendChild(p);

  // animate the text
  gsap.fromTo(p, {scale:0.8}, {scale:1, duration:0.5, ease:"bounce"});
}

function drawRPS(player, opp) {
  return `
    <svg width="500" height="250">
      <rect x="210" y="30" width="80" height="30" fill="${player==='rock'?'#95a5a6':'lightgray'}" rx="10"></rect>
      <text x="250" y="50" text-anchor="middle">Rock</text>

      <rect x="60" y="180" width="80" height="30" fill="${player==='paper'?'#2ecc71':'lightgreen'}" rx="10"></rect>
      <text x="100" y="200" text-anchor="middle">Paper</text>

      <rect x="360" y="180" width="80" height="30" fill="${player==='scissors'?'#e056fd':'lightpink'}" rx="10"></rect>
      <text x="400" y="200" text-anchor="middle">Scissors</text>

      <line x1="250" y1="60" x2="100" y2="180" stroke="#7f8c8d" stroke-width="2"></line>
      <text x="170" y="120" font-size="12" transform="rotate(-45,170,120)">Covers</text>

      <line x1="100" y1="180" x2="400" y2="180" stroke="#7f8c8d" stroke-width="2"></line>
      <text x="250" y="170">Cuts</text>

      <line x1="400" y1="180" x2="250" y2="60" stroke="#7f8c8d" stroke-width="2"></line>
      <text x="320" y="110" font-size="12" transform="rotate(45,320,110)">Crushes</text>

      <text x="210" y="110" fill="#000">Opponent chose: ${opp}</text>
    </svg>
  `;
}

function determineRPSWinner(player, opp) {
  if (player === opp) return 'tie';
  if (
    (player==='rock' && opp==='scissors') ||
    (player==='scissors' && opp==='paper') ||
    (player==='paper' && opp==='rock')
  ) {
    return 'player';
  }
  return 'opp';
}

/*****************************************************************************
 * 7) QUIZ LOGIC
 *****************************************************************************/
function toggleQuiz(quizId) {
  const quiz = document.getElementById(quizId);
  quiz.classList.toggle('hidden');
  // Clear feedback
  const feedback = quiz.querySelector('.feedback');
  if(feedback) feedback.textContent = '';
}

function checkAnswer(quizId, text, message, isCorrect) {
  const quiz = document.getElementById(quizId);
  const feedback = quiz.querySelector('.feedback');
  feedback.textContent = message;
  feedback.style.color = isCorrect ? '#27ae60' : '#e74c3c';
}

/*****************************************************************************
 * 8) TIMER LOGIC
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
 * 9) SLIDER DISPLAY LISTENERS
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
  {id:'pgP4', span:'pgP4Value'}
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
