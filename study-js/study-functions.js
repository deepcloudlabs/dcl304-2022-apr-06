function fun(x=0, y=0, z=0) {
//    x = x || 0;
//    y = y || 0;
//    z = z || 0;
    return x * y + z;
}
console.log(fun())
console.log(fun(1))
console.log(fun(1,2))
console.log(fun(1,2,3))
console.log(fun(1,2,3,4,5,6))

function gun(x, y, z) {
    if (arguments.length !== 3)
        throw "You must provide exactly 3 parameters.";
    for (let arg of arguments){
        if (typeof(arg) !== 'number')
           throw "You must provide a number.";
    }
    return x * y + z;
}

let sun = function (x){ return x * x * x; }
// Functional Programming
//  i) Higher-Order Function
// ii) Lambda Expression / Arrow Function
let run = (x) => { return x * x * x; } // lambda expression
let tun = x => x * x + x // lambda expression

