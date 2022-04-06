function getRandomNumber(min, max) {
    return Math.floor(Math.random()*(max-min+1)) + min;
}

function *getLotteryNumbers(max,size){
    for (let i=0;i<size;i++){
        console.log(`getLotteryNumbers: ${i}`);
        yield getRandomNumber(1,max);
    }
}

for (let number of getLotteryNumbers(60,6)){
    console.log(`for-loop: ${number}`);
}