// Initialize variables
let board;
let turn;
let winner;

// Get elements from the DOM
const squares = Array.from(document.querySelectorAll('.square'));
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');

// Reset the game
function resetGame() {
	board = ['', '', '', '', '', '', '', '', ''];
	turn = 'X';
	winner = null;
	render();
}

// Handle a player's move
function handleMove(index) {
	if (board[index] === '' && !winner) {
		board[index] = turn;
		turn = turn === 'X' ? 'O' : 'X';
		checkForWinner();
		render();
	}
}

// Check for a winner
function checkForWinner() {
	const winningCombos = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];
	for (let i = 0; i < winningCombos.length; i++) {
		const [a, b, c] = winningCombos[i];
		if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
			winner = board[a];
			return;
		}
	}
	if (!board.includes('')) {
		winner = 'Tie';
	}
}

// Render the game
function render() {
	board.forEach((square, index) => {
		squares[index].textContent = square;
		if (square === 'X') {
			squares[index].style.color = 'blue';
		} else if (square === 'O') {
			squares[index].style.color = 'red';
		} else {
			squares[index].style.color = 'black';
		}
	});
	if (winner) {
		message.textContent = winner === 'Tie' ? 'Tie game!' : `${winner} wins!`;
	} else {
		message.textContent = `It's ${turn}'s turn.`;
	}
}

// Add event listeners
resetButton.addEventListener('click', resetGame);
squares.forEach((square, index) => {
	square.addEventListener('click', () => {
		handleMove(index);
	});
});

// Reset the game to start
resetGame();
