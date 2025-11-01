import { io, Socket } from "socket.io-client";


let socket: Socket | null = null;

/**
 * Initialize socket connection
 * @param userId - Current logged-in user's ID
 */
export const initSocket = (userId: string): Socket => {
  if (!socket) {
    socket = io("/", {
      path: "/api/socket",
      query: { userId },
      transports: ["websocket"], // prefer websocket
    });

    socket.on("connect", () => {
      console.log("✅ Connected to socket server:", socket!.id);
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected from socket server");
    });
  }

  return socket;
};

/**
 * Get existing socket instance
 */
export const getSocket = (): Socket | null => {
  return socket;
};

/**
 * Disconnect socket
 */
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
