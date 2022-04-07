class App{
    constructor() {
       this.gameViewModel = new GameViewModel();
       this.playButton = document.querySelector("#playButton");
       this.guessInputText =
           document.querySelector("#guess");
       this.triesBadge = document.querySelector("#tries");
       this.gameLevel = document.querySelector("#game-level");
       this.livesBadge = document.querySelector("#lives");
       this.movesTableBody = document.querySelector("#moves");
       this.playButton.addEventListener('click', (event) => {
           let guess = this.guessInputText.value;
           this.gameViewModel.play(guess);
           this.gameLevel.innerHTML = this.gameViewModel.game.gameLevel;
           this.triesBadge.innerHTML = this.gameViewModel.game.tries;
           this.livesBadge.innerHTML = this.gameViewModel.game.lives;
           emptyElement(this.movesTableBody);
           for (let move of this.gameViewModel.game.moves){
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
       });
    }
}

window.onload = () => {
   let app = new App();
}
