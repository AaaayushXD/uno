import { io } from "socket.io-client";

export const socket = io("http://localhost:8080", {
  transports: ["websocket"], // Enforce WebSocket transport
  upgrade: true, // Enable upgrade
});
