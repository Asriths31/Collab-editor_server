import express from "express"
import dotenv from "dotenv"
import { routes } from "./routes.js"
import mongoose from "mongoose"
import cors from "cors"
import cookieParser from "cookie-parser"
import WebSocket from "ws"
import http from "http"

import { Server } from "socket.io"
import getUserDetails from "./helpers/getUser.js"

dotenv.config()

// const wsUri="ws://127.0.0.1/"

// const websocket=new WebSocket(wsUri)

// websocket.addEventListener("open",()=>{
//     console.log("connectedd")
//      pingInterval = setInterval(() => {
//     console.log(`SENT: ping: ${counter}`);
//     websocket.send("ping");
//   }, 1000);
// })

// websocket.addEventListener("error", (e) => {
//   console.log(`ERROR`,e);
// });


const app=express()

const origins=[
  "https://collab-editor-qcbq.vercel.app",
  "http://localhost:5173"
]

app.use(cors({  
    origin:origins,
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())


const server=http.createServer(app)

const io=new Server(server, {
  cors: {
    origin: origins,
    methods: ["GET", "POST"],
    credentials:true
  }
})

const room=new Map()
const socketToUser=new Map()

io.on("connection",async(socket)=>{
    // console.log("User Connected",socket.id)
    const token=socket.request.headers?.cookie?.split("=")[1]
    const user=await getUserDetails(token)
  // console.log({user,token})
    // if()
  socket.on("join-room",(docId)=>{
    // console.log("User Joined in room",docId)
    socket.join(docId)
    if(!room.has(docId)) room.set(docId,new Map())
    const userRoom=room.get(docId)
    // console.log({userRoom})
    userRoom.set(user?.id,{userId:user?.id,userName:user?.userName}) 

    if(!userRoom.has(user?.id)){
        userRoom.set(user?.id,user) 
    }
    room.set(docId,userRoom)
    socketToUser.set(socket.id,{docId,userId:user?.id})
    
    // console.log("joined in",docId)
    const members_in_room=Array.from(room.get(docId).values())
        console.log("members in room",members_in_room)

    io.to(docId).emit("members_in_room",members_in_room)
  })
    // Listen for messages from client
  socket.on("send_message", ({docId,content}) => {
    // console.log("Message received:", content,docId);

    // Send message to all connected clients ,m  
    socket.to(docId).emit("receive_message",{content});
  });
  
  socket.on("typing",({docId,user})=>{
    socket.to(docId).emit("typing",user)
  })

  // Disconnect
  // socket.on("leave-room",(docId)=>{
  //   console.log("docid in disconnect",docId)
  //    const usersRoom=room.get(docId)
  //   usersRoom?.delete(user.id)
  //   const members_in_room = Array?.from(room?.get(docId)?.values())
  //   console.log("members in room", members_in_room)
  //   room.set(docId, usersRoom)
  //   io.to(docId).emit("members_in_room",members_in_room)
  // })
  socket.on("disconnect", () => {
    // console.log("User disconnected:", socket.id);
    const userDetails=socketToUser?.get(socket.id)
    const usersRoom=room.get(userDetails?.docId)
    usersRoom?.delete(userDetails?.userId)
    const members_in_room = Array?.from(room?.get(userDetails?.docId)?.values()??[])
    console.log("members in room", members_in_room)
    room.set(userDetails?.docId, usersRoom)
    io.to(userDetails?.docId).emit("members_in_room",members_in_room)
  });
})

const connectToDb=async()=>{
    try{
        if(!process.env.MONGO_URI){
            console.log("No Mongo String FOund")
        }
        else{
           await mongoose.connect(process.env.MONGO_URI)
           console.log("Db connected")
        }
    }
    catch(error){
        console.log("Error :",error)
    }
}
app.use("/backend",routes)
connectToDb()

server.listen(process.env.PORT,console.log("Server Started in",process.env.PORT))  