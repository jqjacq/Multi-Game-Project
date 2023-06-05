const navTemplate = `      
    <div class="hamburger">  
        <nav class="navbar">
        <ul class="nav-menu">
            <li class="nav-item home">
                <a href="index.html">Home</a>
            </li>
            <li class="nav-item">
                <a href="game1.html">Matching Game</a>
            </li>
            <li class="nav-item">
                <a href="game2.html">Rock Paper Scissor</a>
            </li>
            <li class="nav-item">
                <a href="game3.html">Tic Tac Toe</a>
            </li>
            <li class="nav-item">
                <a href="game4.html">Breakout</a>
            </li>
            <li class="nav-item">
                <a href="game5.html">Whack a Bear </a>
            </li>
            <li class="nav-item">
                <a href="game6.html">Snake</a>
            </li>
        </ul>
        </nav>
    </div>
`

class gameNav extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = navTemplate
    }
}

customElements.define('game-nav', gameNav); // <navBar>