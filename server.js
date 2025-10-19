const next = require("next");
const { createServer } = require("http");
const express = require("express");
const { Server } = require("socket.io");
const axios = require("axios");

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();
const port = 4000;

nextApp.prepare().then(() => {
  const app = express();
  const server = createServer(app);
  const io = new Server(server, {
    cors: { origin: "*" },
  });

  const onlineUsers = new Map();

  io.on("connection", (socket) => {
    console.log("🟢 Socket connected:", socket.id);

    socket.on("register", (userId) => {
      socket.userId = userId;
      onlineUsers.set(userId, socket.id);
      console.log("✅ Registered user:", userId);
    });

    socket.on("private-message", async (data) => {
      const { senderId, receiverId, content, chatId } = data;
      console.log(`💬 ${senderId} → ${receiverId}: ${content}`);

      

      const messageObj = {
        sender: senderId,
        chat: chatId,
        content,
        createdAt: new Date(),
      };

      // send to receiver if online
      const receiverSocketId = onlineUsers.get(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("private-message", messageObj);
      }

      // echo back to sender
      socket.emit("private-message", messageObj);
    });



    socket.on("disconnect", () => {
      console.log("🔴 Socket disconnected:", socket.id);
      for (const [id, sId] of onlineUsers.entries()) {
        if (sId === socket.id) {
          onlineUsers.delete(id);
          break;
        }
      }
    });
  });

  app.use((req, res) => nextHandler(req, res));

  server.listen(port, () =>
    console.log(`🚀 Socket + Next server running on http://localhost:${port}`)
  );
});
