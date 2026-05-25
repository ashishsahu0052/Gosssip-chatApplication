import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Server running");
});

io.on("connection", (socket) => {
  console.log(`Client connected ${socket.id}`);

  // JOIN ROOM
  socket.on("joinRoom", (data) => {
    socket.join(data.room);

    console.log(`${data.name} joined room ${data.room}`);

    // SEND JOIN MESSAGE TO ROOM
    io.to(data.room).emit("message", {
      sender: "System",
      text: `${data.name} joined room ${data.room}`,
    });
  });

  // SEND CHAT MESSAGE
  socket.on("sendMessage", (data) => {
    io.to(data.room).emit("receiveMessage", {
      sender: data.sender,
      text: data.text,
    });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
