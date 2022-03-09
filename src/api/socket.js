import { createContext } from "react";
import io from "socket.io-client";

import { BASE_URI, TEST_URI } from "@env";

const socket = io(TEST_URI);
const SocketContext = createContext(socket);

socket.on("connection", () => {
  console.log("socket is connected");
});

socket.on("disconnection", () => {
  console.log("socket is connected");
});

export { socket, SocketContext };
