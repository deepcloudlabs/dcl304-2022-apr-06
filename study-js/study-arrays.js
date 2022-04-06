numbers = [4, 8, 15, 16, 23, 42]
console.log(numbers.length)
console.log(numbers)
console.log(numbers[0])
console.log(numbers[numbers.length - 1])

numbers = new Array(4, 8, 15, 16, 23, 42)
console.log(numbers.length)
console.log(numbers)
console.log(numbers[0])
console.log(numbers[numbers.length - 1])

numbers = new Array(4)
console.log(numbers.length)
console.log(numbers)

numbers = [4, 8, 15, 16, 23, 42]
numbers[100] = 100
// Loop #1
for (let i = 0; i < numbers.length; ++i) {
    console.log(`${i}: ${numbers[i]}`)
}
// Loop #2
for (let index in numbers) {
    console.log(`${index}: ${numbers[index]}`)
}
// Loop #3
for (let number of numbers) {
    console.log(`${number}`)
}
