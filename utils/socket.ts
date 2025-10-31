import { io } from "socket.io-client";

const socket = io("http://localhost:3000"); // no custom path needed now

export default socket;
