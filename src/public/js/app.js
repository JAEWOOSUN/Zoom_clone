const socket = new WebSocket(`ws://${window.location.host}`);       // app.js의 socket은 server로의 연결을 의미함


socket.addEventListener("open", () => {
    console.log("Connected to server");
});

socket.addEventListener("message", (message) =>{
    console.log("Just got this : ",message);
});

socket.addEventListener("close", () =>{
    console.log("Disconnected to server");
});

setTimeout(()=>{
    socket.send("hello from the browser before 10s");
}, 10000);