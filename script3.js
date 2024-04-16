const board = document.getElementById('board');
const status = document.getElementById('status');
const resetButton = document.getElementById('resetButton');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

const checkWin = () => {
  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      return gameState[a];
    }
  }
  if (!gameState.includes('')) return 'draw';
  return null;
};

const handleCellClick = (e) => {
  const index = e.target.getAttribute('data-index');
  if (gameState[index] === '' && gameActive) {
    gameState[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    const winner = checkWin();
    if (winner) {
      gameActive = false;
      if (winner === 'draw') {
        status.textContent = "It's a draw!";
      } else {
        status.textContent = `${winner} wins!`;
      }
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      status.textContent = `Player ${currentPlayer}'s turn`;
    }
  }
};

const resetGame = () => {
  currentPlayer = 'X';
  gameActive = true;
  gameState = ['', '', '', '', '', '', '', '', ''];
  status.textContent = `Player ${currentPlayer}'s turn`;
  document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
};

board.addEventListener('click', handleCellClick);
resetButton.addEventListener('click', resetGame);
