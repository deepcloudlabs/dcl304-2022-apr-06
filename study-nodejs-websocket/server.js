let fetch = require('node-fetch');

setInterval( () => {
    fetch("https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT")
        .then( res => res.json())
        .then( ticker => console.log(ticker));
}, 200);