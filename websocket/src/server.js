import express from "express";
import http from "http";
import { Server } from "socket.io";
// import WebSocket, { WebSocketServer } from "ws";

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

const httpServer = http.createServer(app);
const wsServer = new Server(httpServer);

function publicRooms() {
  const {
    sockets: {
      adapter: { sids, rooms },
    },
  } = wsServer;
  // const sids = wsServer.sockets.adapter.sids;
  // const rooms = wsServer.sockets.adapter.rooms;

  const publicRoom = [];
  rooms.forEach((_, key) => {
    if (sids.get(key) === undefined) {
      publicRoom.push(key);
    }
  });
  return publicRoom;
}

function countRoom(roomName) {
  return wsServer.sockets.adapter.rooms.get(roomName)?.size;
}

wsServer.on("connection", (socket) => {
  socket["nickname"] = "Anon";

  socket.onAny((event) => {
    console.log(`socket Event:${event}`);
  });

  socket.on("enter_room", (roomName, done) => {
    socket.join(roomName);
    done();
    socket.to(roomName).emit("welcome", socket.nickname, countRoom(roomName));
    wsServer.sockets.emit("room_change", publicRooms());
  });

  socket.on("disconnecting", () => {
    socket.rooms.forEach((room) =>
      socket.to(room).emit("bye", socket.nickname, countRoom(room) - 1)
    );
  });

  socket.on("disconnect", () => {
    wsServer.sockets.emit("room_change", publicRooms());
  });

  socket.on("new_message", (msg, room, done) => {
    socket.to(room).emit("new_message", `${socket.nickname}: ${msg}`);
    done();
  });

  socket.on("nickname", (nickname) => {
    socket["nickname"] = nickname;
  });
});

// const wss = new WebSocketServer({ server });

// const sockets = [];

// wss.on("connection", (socket) => {
//   console.log("connected to Browser");

//   //socket === 접속한 사람
//   sockets.push(socket);
//   socket["nickname"] = "Anon";

//   socket.on("close", () => {
//     console.log("Disconnected from the browser");
//   });

//   socket.on("message", (msg, isBinary) => {
//     const message = JSON.parse(msg);
//     console.log(message, msg.toString("utf8"));
//     // if (message.type === "new_message") {
//     //   sockets.forEach((aSocket) => aSocket.send(message.payload));
//     // } else if ((message.type = "nickname")) {
//     //   console.log(message.payload);
//     // }

//     switch (message.type) {
//       case "new_message":
//         sockets.forEach((aSocket) => aSocket.send(`${socket.nickname}: ${message.payload}`));

//       case "nickname":
//         socket["nickname"] = message.payload;

//       default:
//         return;
//     }
//   });
// });

httpServer.listen(3000, () => {
  console.log(`Listening on http:localhost:3000`);
});
