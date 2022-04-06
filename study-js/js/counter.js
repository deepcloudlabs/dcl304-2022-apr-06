// JavaScript: i) Functional -> Higher-Order Function : setInterval
//            ii) Asynchronous Function
//           iii) Event-Driven
//         JS Engine: Single Execution Thread -> Event Queue -> Event -> Callback Function
window.onload = app; // app function --> ONLOAD_EVENT
function app() {
    function timeout_callback() {
        counter++;
        spanCounter.innerHTML = counter.toString();
    };
    let counter = 0;
    let spanCounter = document.querySelector("#counter");
    setInterval(timeout_callback, 1000); // ON_TIMEOUT_EVENT -> timeout_callback
}
