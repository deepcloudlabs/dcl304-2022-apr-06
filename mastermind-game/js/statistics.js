/*
    Game Statistics Model
    @author Binnur Kurt <binnur.kurt@gmail.com>
 */
export class GameStatistics {
    constructor() {
        this.wins = 0;
        this.loses = 0;
        this.total = 0;
        window.addEventListener("wins", (event) => {
            this.wins++;
            this.total++;
        }, false);
        window.addEventListener("loses", (event) => {
            this.loses++;
            this.total++;
        }, false);
    }

    loadFromStore = (statistics) => {
        this.wins = statistics.wins;
        this.loses = statistics.loses;
        this.total = statistics.total;
    }
}