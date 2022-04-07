function createRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

exports.getLotteryNumbers = async function(max, size) {
    let numbers = [];
    while (numbers.length < size) {
        let number = createRandomNumber(1, max);
        if (numbers.includes(number)) continue;
        numbers.push(number);
    }
    numbers.sort((x, y) => x - y);
    return numbers;
}