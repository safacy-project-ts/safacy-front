import { createContext } from "react";
import io from "socket.io-client";

const socket = io(process.env.REACT_APP_TEST_URI);
const SocketContext = createContext(socket);

socket.on("connection", () => {
  console.log("socket is connected");
});

socket.on("disconnection", () => {
  console.log("socket is connected");
});

export { socket, SocketContext };
