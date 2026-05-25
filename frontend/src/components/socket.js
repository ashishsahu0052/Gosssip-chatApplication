import { io } from "socket.io-client";

export const socket = io("https://gosssip-chatapplication.onrender.com", {
  autoConnect: false,
});
