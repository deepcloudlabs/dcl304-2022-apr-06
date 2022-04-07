const Websocket = require('ws');
const binanceWssUrl = "wss://stream.binance.com:9443/ws/btcusdt@trade";
const ws = new Websocket(binanceWssUrl);
const tradingAnalytics = {};

ws.on('message', (frame) => {
    let trade = JSON.parse(frame);
    let volume = Number(trade.p) * Number(trade.q);
    let bidId = trade.b;
    if (tradingAnalytics.hasOwnProperty(bidId)) {
        tradingAnalytics[bidId].bid += volume;
    } else {
        tradingAnalytics[bidId] = { 'bid': volume , 'ask': 0 };
    }
    let askId = trade.a;
    if (tradingAnalytics.hasOwnProperty(askId)) {
        tradingAnalytics[askId].ask += volume;
    } else {
        tradingAnalytics[askId] = { 'bid': 0, 'ask': volume};
    }
});

setInterval(() => {
    let maxBidVolume = Number.MIN_VALUE;
    let maxBidVolumePerson = 0;
    let maxAskVolume = Number.MIN_VALUE;
    let maxAskVolumePerson = 0;
    for (let person in tradingAnalytics) {
        if (tradingAnalytics[person].bid > maxBidVolume) {
            maxBidVolume = tradingAnalytics[person].bid;
            maxBidVolumePerson = person;
        }
        if (tradingAnalytics[person].ask > maxAskVolume) {
            maxAskVolume = tradingAnalytics[person].ask;
            maxAskVolumePerson = person;
        }
    }
    console.log(`Analytics: \nBid: ${maxBidVolumePerson} --> ${maxBidVolume}           \nAsk: ${maxAskVolumePerson} --> ${maxAskVolume}`);
}, 10000);