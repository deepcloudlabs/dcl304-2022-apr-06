// Model: Game, GameStatistics
// View : game.html (HTML/CSS)
import {GameStatistics} from "./statistics.js";
import {Game} from "./mastermind.js";

export class GameViewModel {
    constructor(router) {
        this.game = new Game(router);
        this.statistics = new GameStatistics();
    }

    play = (guess) => {
        this.game.guess = Number(guess);
        this.game.play();
    }
}