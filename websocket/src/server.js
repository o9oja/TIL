import express from "express";
import http from "http";
import WebSocket, { WebSocketServer } from "ws";

import path from "path";
const __dirname = path.resolve();
// console.log(__dirname);

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/src/views");
app.use("/public", express.static(__dirname + "/src/public"));

//렌더
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const sockets = [];

wss.on("connection", (socket) => {
  console.log("connected to Browser");

  //socket === 접속한 사람
  sockets.push(socket);
  socket["nickname"] = "Anon";

  socket.on("close", () => {
    console.log("Disconnected from the browser");
  });

  socket.on("message", (msg, isBinary) => {
    const message = JSON.parse(msg);
    console.log(message, msg.toString("utf8"));
    // if (message.type === "new_message") {
    //   sockets.forEach((aSocket) => aSocket.send(message.payload));
    // } else if ((message.type = "nickname")) {
    //   console.log(message.payload);
    // }

    switch (message.type) {
      case "new_message":
        sockets.forEach((aSocket) => aSocket.send(`${socket.nickname}: ${message.payload}`));

      case "nickname":
        socket["nickname"] = message.payload;

      default:
        return;
    }
  });
});

server.listen(3000, () => {
  console.log(`Listening on http:localhost:3000`);
});
