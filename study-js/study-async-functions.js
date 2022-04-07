function sync_get_min(numbers){
        if (numbers.length === 0)
            throw "Empty array has no minimum";
        let minValue= Number.MAX_VALUE;
        for (let number of numbers){
            if (number < minValue)
                minValue = number;
        }
        return minValue;
}

function async_get_min(numbers){
    return new Promise((resolve,reject) => {
        if (numbers.length === 0)
            reject("Empty array has no minimum");
        let minValue= Number.MAX_VALUE;
        for (let number of numbers){
            if (number < minValue)
                minValue = number;
        }
        setTimeout(()=>{
            resolve(minValue);
        }, Math.floor(Math.random()*5000) + 1000)
    });
}

let myNumbers = [30,29,28,27,26];
//console.log(sync_get_min(myNumbers));
//console.log("Hello Mars!");
// console.log(sync_get_min([]));

for (let i=0;i<10;++i){
    let [...another_array] = [...myNumbers];
    another_array.push(i);
    async_get_min(another_array).then(
        minValue => console.log(minValue),
        reason => console.error(reason)
    );
}
console.log("Hello Mars!");
/*
async_get_min([]).then(
    minValue => console.log(minValue),
    reason => console.error(reason)
);*/
