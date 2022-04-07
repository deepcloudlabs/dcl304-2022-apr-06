async function async_get_min(numbers){
        if (numbers.length === 0)
            throw "Empty array has no minimum";
        let minValue= Number.MAX_VALUE;
        for (let number of numbers){
            if (number < minValue)
                minValue = number;
        }
        return minValue;
}

let async_fun = async (numbers) => {
        if (numbers.length === 0)
            throw "Empty array has no minimum";
        let minValue= Number.MAX_VALUE;
        for (let number of numbers){
            if (number < minValue)
                minValue = number;
        }
        return minValue;
}

let myNumbers = [30,29,28,27,26];

for (let i=0;i<10;++i){
    let [...another_array] = [...myNumbers];
    another_array.push(i);
    async_fun(another_array).then(console.log, console.error );
    // async_get_min(another_array).then(console.log, console.error );
}
console.log("Hello Mars!");
/*
async_get_min([]).then(
    minValue => console.log(minValue),
    reason => console.error(reason)
);*/
