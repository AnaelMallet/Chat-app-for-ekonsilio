import { io } from "socket.io-client"

export const socketIO = io("http://localhost:3001", {
  autoConnect: false
})