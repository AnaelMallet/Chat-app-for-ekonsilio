import express from "express"
import http from "http"
import { Server } from "socket.io"

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3002"]
  }
})

const userSocketMap = {}

export function getReceiverSocketId(userId: string) {
  return userSocketMap[userId]
}

io.on("connection", (socket) => {
  console.log("user connected", socket.id)

  const userId = socket.handshake.query.userId as string
  if (userId) userSocketMap[userId] = socket.id

  io.emit("onlineUsers", Object.keys(userSocketMap))

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id)
    
    delete userSocketMap[userId]
    io.emit("onlineUsers", Object.keys(userSocketMap))
  })
})

export { io, server, app }