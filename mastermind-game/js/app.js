import {GameViewModel} from "./game.js";
import {emptyElement} from "./utils.js";

export class App {
    constructor() {
        this.gameViewModel = new GameViewModel();
        //region DOM API : Html Element Selection in View
        this.playButton = document.querySelector("#playButton");
        this.guessInputText =
            document.querySelector("#guess");
        this.triesBadge = document.querySelector("#tries");
        this.gameLevel = document.querySelector("#game-level");
        this.livesBadge = document.querySelector("#lives");
        this.counterBadge = document.querySelector("#counter");
        this.movesTableBody = document.querySelector("#moves");
        //endregion

        setInterval(() => {
            this.gameViewModel.game.countdown();
            this.updateView();

        }, 1000);

        this.playButton.addEventListener('click', (event) => {
            let guess = this.guessInputText.value;
            this.gameViewModel.play(guess);
            this.updateView();
        });
    }

    updateView = () => { // DOM API
        this.gameLevel.innerHTML = this.gameViewModel.game.gameLevel;
        this.triesBadge.innerHTML = this.gameViewModel.game.tries;
        this.livesBadge.innerHTML = this.gameViewModel.game.lives;
        this.counterBadge.innerHTML = this.gameViewModel.game.counter;
        emptyElement(this.movesTableBody);
        for (let move of this.gameViewModel.game.moves) {
            let tr = this.movesTableBody.insertRow();
            let cellGuess = tr.insertCell(0);
            let cellEvaluation = tr.insertCell(1);
            cellGuess.appendChild(
                document.createTextNode(move.guess)
            );
            cellEvaluation.appendChild(
                document.createTextNode(move.evaluation)
            );
        }
    }
}

window.onload = () => {
    let app = new App();
}
