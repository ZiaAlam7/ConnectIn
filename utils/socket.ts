import { io } from "socket.io-client";

  const PORT = process.env.PORT || 3000;

const socket = io(`http://localhost:${PORT}`); // no custom path needed now

export default socket;
