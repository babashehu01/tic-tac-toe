function Player(name, marker) {
    this.name = name;
    this.marker = marker;
}

function Gameboard() {
    let gameboard = ['', '', '', '', '', '', '', '', ''];
    return gameboard;
}

function checkWinner(p, gb) {
    let marker = p.marker;
    if (gb[0] === marker && gb[1] === marker && gb[2] === marker)
        return p;
    if (gb[3] === marker && gb[4] === marker && gb[5] === marker)
        return p;
    if (gb[6] === marker && gb[7] === marker && gb[8] === marker)
        return p;
    if (gb[0] === marker && gb[3] === marker && gb[6] === marker)
        return p;
    if (gb[1] === marker && gb[4] === marker && gb[7] === marker)
        return p;
    if (gb[2] === marker && gb[5] === marker && gb[8] === marker)
        return p;
    if (gb[0] === marker && gb[4] === marker && gb[8] === marker)
        return p;
    if (gb[2] === marker && gb[4] === marker && gb[6] === marker)
        return p;
    if (gb.every(cell => cell != '')) return 1;
}

function renderGameBoard(p1, p2, gameboard) {
    const gameBoard = document.createElement('div');
    const infoSection = document.querySelector('#info');
    const body = document.querySelector('body');
    gameBoard.setAttribute('id', 'game');
    body.appendChild(gameBoard);
    infoSection.textContent = `Play: ${p1.name}'s turn.`;
    gameBoard.textContent = '';
    for (let i = 0; i < 9; i++) {
        let node = document.createElement('div');
        node.setAttribute('data-index', i);
        gameBoard.appendChild(node);
    }
    let currentPlayer = p2;
    gameBoard.addEventListener("click", function clickHandler(e) {
        if (e.target.textContent === '') {
            infoSection.textContent = `Play: ${currentPlayer.name}'s turn.`
            currentPlayer === p1 ? currentPlayer = p2 : currentPlayer = p1;
            e.target.textContent = currentPlayer.marker;
            let index = e.target.getAttribute('data-index');
            gameboard[index] = currentPlayer.marker;
            let winner = checkWinner(currentPlayer, gameboard);
            if (winner) {
                const restartIcon = document.createElement('img');
                restartIcon.setAttribute('src', "assets/restart-icon.png");
                restartIcon.setAttribute('alt', 'Replay icon')
                const winnerText = document.createElement('p');
                const restartText = document.createElement('p');
                restartText.setAttribute('id', 'replay');
                infoSection.textContent = '';
                winner === 1 ? winner = "IT'S A DRAW" : winner = `CONGRATULATIONS!!!\n${winner.name} has WON the match.`;
                infoSection.setAttribute('style', 'font-size: 18px;');
                winnerText.textContent = winner;
                infoSection.appendChild(winnerText);
                restartText.textContent = 'Replay: ';
                restartText.appendChild(restartIcon);
                infoSection.appendChild(restartText);
                gameBoard.setAttribute('style', 'opacity: .4;');
                const newGameBoard = Gameboard();
                restartText.addEventListener('click', () => {
                    gameBoard.remove();
                    renderGameBoard(p1, p2, newGameBoard);
                });
                this.removeEventListener('click', clickHandler);
            }
        }
    });
}

// MAIN GAME PLAY
function main() {
const startButton = document.querySelector('#start');
startButton.addEventListener('click', () => {
    const form = document.querySelector('form');
    if(!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    const player1_name = document.querySelector('#player-1-name').value;
    const player2_name = document.querySelector('#player-2-name').value;
    const p1 = new Player(player1_name, 'X');
    const p2 = new Player(player2_name, 'O');
    const gameBoard = Gameboard();
    renderGameBoard(p1, p2, gameBoard);
});
}

main(); 