const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const httpServer = http.createServer(app);
const PORT = 3000;

const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("New user is Connected");

  socket.on("chat", (msg) => {
    io.emit("chat-transfer", msg);
  });

  socket.join("kitchen");
  const size = io.sockets.adapter.rooms.get("kitchen").size;
  io.sockets.in("kitchen").emit("alu", "Hello alu vorta hoice?" + size);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

httpServer.listen(PORT, () => {
  console.log(`Server is Running on ${PORT}`);
});
