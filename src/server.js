import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set('view engine', "pug");
app.set("views", __dirname+"/views");
app.use("/public", express.static(__dirname+"/public"));

app.get("/", (req, res) => res.render("home") );
app.get("/*", (req, res) => res.redirect("/") );

const handleListen = () => console.log("Listening on http://43.201.207.187:3000");

// app.listen(3000, handleListen);

const server  = http.createServer(app);

const wss = new WebSocket.Server({server}); // http 서버 위에 web socket 서버를 올릴 수 있음


// 아래 내용하고 똑같지만 아래처럼 사용하는 것이 훨씬 좋음 (익명함수)
// wss.on("connection", handleConnection);
// function handleConnection(socket){  // server.js의 socket은 연결된 browser를 의미함
//     console.log(socket);
// }

wss.on("connection", (socket) => {

    console.log("Connected to browser");
    socket.on("close", ()=> console.log("Disconnected from the browser"));
    socket.on("message", (message) => {
        console.log(message.toString());
    });
    socket.send("hello!");
});

server.listen(3000, handleListen);