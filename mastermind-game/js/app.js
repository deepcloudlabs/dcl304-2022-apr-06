import {GameViewModel} from "./game.js";
import {emptyElement} from "./utils.js";
import {Router} from "./router.js";

/*
    App creates a ViewModel and connects View to both ViewModel and Model.
    @author Binnur Kurt <binnur.kurt@gmail.com>
 */
export class App {
    constructor(router) {
        this.gameViewModel = new GameViewModel(router);
    }

    init() {
        //region DOM API : Html Element Selection in View
        this.playButton = document.querySelector("#playButton");
        this.guessInputText = document.querySelector("#guess");
        this.triesBadge = document.querySelector("#tries");
        this.gameLevel = document.querySelector("#game-level");
        this.counterBadge = document.querySelector("#counter");
        this.movesTableBody = document.querySelector("#moves");
        this.divLivesIcons = document.querySelector("#lives-icons");
        this.counterProgressBar = document.querySelector("#counterProgressBar");
        this.winsBadge = document.querySelector("#wins");
        this.losesBadge = document.querySelector("#loses");
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

    updateView = () => {
        // Heavily uses DOM API
        this.gameLevel.innerHTML = this.gameViewModel.game.gameLevel;
        this.triesBadge.innerHTML = this.gameViewModel.game.tries;
        this.winsBadge.innerHTML = `${this.gameViewModel.statistics.wins} of ${this.gameViewModel.statistics.total}`;
        this.losesBadge.innerHTML = `${this.gameViewModel.statistics.loses} of ${this.gameViewModel.statistics.total}`;
        this.counterBadge.innerHTML = this.gameViewModel.game.counter;
        this.counterProgressBar.style.width = `${this.gameViewModel.game.counter*5/3}%`;

        if (this.divLivesIcons.childNodes.length !== this.gameViewModel.game.lives) {
            emptyElement(this.divLivesIcons);
            for (let i = 0; i < this.gameViewModel.game.lives; ++i) {
                const image = document.createElement('img');
                image.src = "images/heart-icon.jpg";
                image.style.width = "16px"
                image.style.height = "16px"
                this.divLivesIcons.appendChild(image);
            }
        }
        // DOM API is a low level API, it requires boilerplate code even simply to add table rows.
        emptyElement(this.movesTableBody);
        for (let move of this.gameViewModel.game.moves) {
            let tr = this.movesTableBody.insertRow();
            let cellGuess = tr.insertCell(0);
            let cellEvaluation = tr.insertCell(1);
            cellGuess.appendChild(document.createTextNode(move.guess));
            cellEvaluation.appendChild(document.createTextNode(move.evaluation));
        }
    }
}

let router = new Router({
    "loses": "gameover.html",
    "wins": "wins.html"
});
let app = new App(router);
window.onload = () => {
    app.init();
}
