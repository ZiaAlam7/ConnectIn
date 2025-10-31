const next = require("next");
const { createServer } = require("http");
const express = require("express");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();
const port = 3000;

nextApp.prepare().then(() => {
  const app = express();
  const server = createServer(app);
  const io = new Server(server, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log("🟢 Socket connected:", socket.id);

    socket.on("message", (msg) => {
      console.log("💬 Message:", msg);
      io.emit("message", msg); // broadcast to all clients
    });

    socket.on("disconnect", () => {
      console.log("🔴 Socket disconnected:", socket.id);
    });
  });

  // ✅ Catch-all for Next.js pages
  app.use((req, res) => nextHandler(req, res));

  server.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
  });
});
