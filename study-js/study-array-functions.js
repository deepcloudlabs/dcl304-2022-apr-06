numbers = [42, 8, 16, 15, 23, 4]
numbers.sort(function(u,v){
   if (u < v) return -1;
   if (u===v) return 0;
   return +1;
});
numbers.sort(function(u,v){ return v-u;});
numbers.sort((u,v) => v-u ); // lambda expression
console.log(numbers)

numbers = [42, 8, 16, 15, 23, 4]
let sum = 0;
for (let number of numbers){
    if (number%2 === 1)
       sum += number*number*number;
}
console.log(sum)

function cube(v){ return v*v*v;}

let ifOdd = u => u%2 == 1;
let toCube = v => v*v*v;
let accumulate = (s, n) => s+n;
sum= numbers.filter( ifOdd ) // Higher-Order Function
            .map( cube ) // Higher-Order Function
            .reduce( accumulate ); // Higher-Order Function
console.log(sum)
