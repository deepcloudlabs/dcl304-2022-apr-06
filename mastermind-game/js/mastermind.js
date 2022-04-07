import {Move} from "./move.js";

/*
    Game Model
    @author Binnur Kurt <binnur.kurt@gmail.com>
 */
export class Game {
    constructor(router) {
        this.gameLevel = 3;
        this.secret = this.createSecret(3);
        this.tries = 0;
        this.guess = 123;
        this.moves = [];
        this.counter = this.createInitialCounter(3);
        this.maxTries = this.createMaxTries(3);
        this.lives = 3;
        this.router = router;
    }

    play = () => {
        this.tries++;
        this.guess = Number(this.guess);
        if (this.guess === this.secret) {
            this.gameLevel++;
            this.lives++;
            window.dispatchEvent(new CustomEvent("wins"));
            if (this.gameLevel === 11){
                this.router.route("wins");
            } else {
                this.initializeGame(this.gameLevel);
            }
        } else {
            if (this.tries > this.maxTries) {
                this.lives--;
                window.dispatchEvent(new CustomEvent("loses"));
                if (this.lives === 0) {
                    this.router.route("loses");
                } else {
                    this.initializeGame(this.gameLevel);
                }
            } else {
                this.moves.push(new Move(this.guess, this.secret));
            }
        }
    }

    //region create secret
    createSecret = (level) => {
        let digits = [this.createRandomDigit(1, 9)];
        while (digits.length < level) {
            let digit = this.createRandomDigit(0, 9);
            if (digits.includes(digit)) continue;
            digits.push(digit);
        }
        let theSecret = digits.reduce((number, digit) => 10 * number + digit, 0);
        console.log(theSecret);
        return theSecret;
    }

    createRandomDigit = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    //endregion

    //region computing initial values
    createInitialCounter = (level) => {
        return 60 + 10 * (level - 3);
    }

    createMaxTries = (level) => {
        return 10 + 2 * (level - 3);
    }
    //endregion

    initializeGame = (gameLevel) => {
        this.moves = [];
        if (this.secret !== this.guess)
           this.moves.push(new Move(this.secret,this.secret));
        this.secret = this.createSecret(gameLevel);
        this.tries = 0;
        this.counter = this.createInitialCounter(gameLevel);
        this.maxTries = this.createMaxTries(gameLevel);
    }

    countdown = () => {
        this.counter--;
        if (this.counter <= 0){
            this.lives--;
            window.dispatchEvent(new CustomEvent("loses"));
            if (this.lives === 0) {
                this.router.route("loses");
            } else {
                this.initializeGame(this.gameLevel);
            }
        }
    }
}