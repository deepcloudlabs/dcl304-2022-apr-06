// MVC's Model
class Game {
    constructor() {
        this.gameLevel = 3;
        this.secret = this.createSecret(3);
        this.tries = 0;
        this.guess = 123;
        this.moves = [];
        this.counter = this.createInitialCounter(3);
        this.maxTries = this.createMaxTries(3);
        this.lives = 3;
    }

    play = () => {
        this.tries++;
        this.guess = Number(this.guess);
        if (this.guess === this.secret) {
            this.gameLevel++;
            if (this.gameLevel === 11){
                //TODO: Player wins!
            } else {
                this.initializeGame(this.gameLevel);
            }
        } else {
            if (this.tries > this.maxTries) {
                this.lives--;
                if (this.lives === 0) {
                    //TODO: player loses the game!
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
        return digits.reduce((number, digit) => 10 * number + digit, 0);
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
}