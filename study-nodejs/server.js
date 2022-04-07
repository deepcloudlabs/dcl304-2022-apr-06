let http = require('http');
let lottery = require('./lottery');
const port = 8200;

http.createServer(async (req, res) => {
    res.writeHead(200);
    lottery.getLotteryNumbers(60,6)
           .then( numbers => res.end(JSON.stringify(numbers)));
}).listen(port);
console.log(`The server is running at port ${port}`);