// Ultimatum Game Diagram
function showUltimatumDiagram() {
  const container = document.getElementById('ultimatumDiagram');
  container.innerHTML = `
    <svg width="500" height="300">
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
      <text x="410" y="10" fill="red" font-size="12">Payoffs = 0,0</text>
      <text x="410" y="70" fill="blue" font-size="12">Payoffs = X, (10 - X)</text>
    </svg>
  `;
}

// Trust Game Diagram
function showTrustDiagram() {
  const container = document.getElementById('trustDiagram');
  container.innerHTML = `
    <svg width="500" height="300">
      <!-- Sender Node -->
      <rect x="20" y="120" width="80" height="40" fill="lightblue" rx="10" ry="10"></rect>
      <text x="60" y="145" text-anchor="middle" fill="#000">Sender</text>

      <!-- Arrow to Tripled Node -->
      <line x1="100" y1="140" x2="200" y2="140" stroke="black" stroke-width="2"></line>
      <text x="150" y="130" fill="#000">Sends X</text>

      <!-- Tripled Node -->
      <rect x="200" y="120" width="100" height="40" fill="lightgreen" rx="10" ry="10"></rect>
      <text x="250" y="145" text-anchor="middle" fill="#000">Tripled: 3X</text>

      <!-- Arrow to Receiver -->
      <line x1="300" y1="140" x2="380" y2="140" stroke="black" stroke-width="2"></line>
      <text x="340" y="130" fill="#000">Transfer</text>

      <!-- Receiver Node -->
      <rect x="380" y="120" width="80" height="40" fill="lightcoral" rx="10" ry="10"></rect>
      <text x="420" y="145" text-anchor="middle" fill="#000">Receiver</text>

      <!-- Return Arrow -->
      <line x1="420" y1="160" x2="280" y2="220" stroke="black" stroke-width="2"></line>
      <text x="360" y="195" fill="#000">Returns Y</text>

      <!-- Sender final payoff -->
      <text x="150" y="240" fill="blue">Sender = (Initial - X) + Y</text>
      <!-- Receiver final payoff -->
      <text x="320" y="240" fill="blue">Receiver = (3X - Y)</text>
    </svg>
  `;
}

// Public Goods Diagram
function showPublicGoodsDiagram() {
  const container = document.getElementById('publicGoodsDiagram');
  container.innerHTML = `
    <svg width="500" height="300">
      <!-- Center Circle (Public Pot) -->
      <circle cx="250" cy="150" r="30" fill="gold"></circle>
      <text x="250" y="155" text-anchor="middle" fill="#000">Public Pot</text>

      <!-- Player nodes -->
      <rect x="100" y="40" width="60" height="30" fill="lightblue" rx="10" ry="10"></rect>
      <text x="130" y="60" text-anchor="middle" fill="#000">P1</text>

      <rect x="340" y="40" width="60" height="30" fill="lightblue" rx="10" ry="10"></rect>
      <text x="370" y="60" text-anchor="middle" fill="#000">P2</text>

      <rect x="100" y="230" width="60" height="30" fill="lightblue" rx="10" ry="10"></rect>
      <text x="130" y="250" text-anchor="middle" fill="#000">P3</text>

      <rect x="340" y="230" width="60" height="30" fill="lightblue" rx="10" ry="10"></rect>
      <text x="370" y="250" text-anchor="middle" fill="#000">P4</text>

      <!-- Arrows to Pot -->
      <line x1="160" y1="55" x2="220" y2="100" stroke="black" stroke-width="2"></line>
      <line x1="340" y1="55" x2="280" y2="100" stroke="black" stroke-width="2"></line>
      <line x1="160" y1="245" x2="220" y2="200" stroke="black" stroke-width="2"></line>
      <line x1="340" y1="245" x2="280" y2="200" stroke="black" stroke-width="2"></line>

      <!-- Payoff Note -->
      <text x="250" y="180" text-anchor="middle" fill="#000" font-size="14">
        Payoff = (Total in Pot) / (# of players)
      </text>
    </svg>
  `;
}

// Speculative Bubbles Diagram
function showSpeculativeDiagram() {
  const container = document.getElementById('speculativeDiagram');
  container.innerHTML = `
    <svg width="500" height="300">
      <!-- Axes -->
      <line x1="50" y1="250" x2="450" y2="250" stroke="black" stroke-width="2"></line>
      <line x1="50" y1="250" x2="50" y2="50" stroke="black" stroke-width="2"></line>

      <!-- X-axis label -->
      <text x="450" y="270" fill="#000">Round</text>
      <!-- Y-axis label -->
      <text x="30" y="55" fill="#000" transform="rotate(-90, 30, 55)">Price</text>

      <!-- Example bubble line (simple wave) -->
      <polyline fill="none" stroke="blue" stroke-width="2"
        points="50,220 100,200 150,160 200,100 250,80 300,110 350,160 400,200 450,220" />

      <!-- Label -->
      <text x="70" y="210" fill="blue">Early Rounds</text>
      <text x="310" y="120" fill="blue">Bubble Peak</text>
      <text x="390" y="190" fill="blue">Crash</text>
    </svg>
  `;
}

// Rock-Paper-Scissors Diagram
function showRPSDiagram() {
  const container = document.getElementById('rpsDiagram');
  container.innerHTML = `
    <svg width="500" height="300">
      <!-- Rock Node -->
      <rect x="220" y="20" width="60" height="30" fill="lightgray" rx="10" ry="10"></rect>
      <text x="250" y="40" text-anchor="middle" fill="#000">Rock</text>

      <!-- Paper Node -->
      <rect x="80" y="180" width="60" height="30" fill="lightgreen" rx="10" ry="10"></rect>
      <text x="110" y="200" text-anchor="middle" fill="#000">Paper</text>

      <!-- Scissors Node -->
      <rect x="360" y="180" width="60" height="30" fill="lightpink" rx="10" ry="10"></rect>
      <text x="390" y="200" text-anchor="middle" fill="#000">Scissors</text>

      <!-- Arrows -->
      <line x1="250" y1="50" x2="110" y2="180" stroke="black" stroke-width="2"></line>
      <text x="140" y="110" fill="#000" font-size="12" transform="rotate(-45,140,110)">Covers</text>

      <line x1="110" y1="180" x2="390" y2="180" stroke="black" stroke-width="2"></line>
      <text x="250" y="170" fill="#000">Cut</text>

      <line x1="390" y1="180" x2="250" y2="50" stroke="black" stroke-width="2"></line>
      <text x="320" y="115" fill="#000" font-size="12" transform="rotate(45,320,115)">Crushes</text>
    </svg>
  `;
}
