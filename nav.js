const navTemplate = `        
<div>
    <nav class="navbar">
        <a class="gameNav" href="index.html">Home</a>
        <a class="gameNav" href="game1.html">Matching Game</a>
        <a class="gameNav" href="game2.html">Rock Paper Scissor</a>
        <a class="gameNav" href="game3.html">Tic Tac Toe</a>
        <a class="gameNav" href="game4.html">Breakout</a>
        <a class="gameNav" href="game5.html">Whack a Bear </a>
        <a class="gameNav" href="game6.html">Snake</a>
    </nav>
</div>`

class gameNav extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = navTemplate
    }
}

customElements.define('game-nav', gameNav); // <navBar>