import mongoose from "mongoose";
import { app } from "./app";
import { connectDB } from "./src/config/db";
import { intPort } from "./src/config/port";
import { natsWrapper } from "./nats-wrapper";
import { UserCreatedListener } from "./src/events/listeners/user-created-listener";
import {TenantCreatedListener } from "./src/events/listeners/tenant-created-listener";
import { Server as SocketIOServer, Socket } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
let rooms:any[] = []
let connectedUsers: any[] = []
const start = async () => { 
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URL must be defined");
  }
  // if (!process.env.NATS_CLIENT_ID) {
  //   throw new Error("NATS_CLIENT_ID must be defined");
  // }
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  try { 

    await natsWrapper.connect(
      "ticketing",
       "communication",  
      "http://nats-srv:4222"
    )  
     
    natsWrapper.client.on("close", () => {
      console.log("NATS connetion closed!"); 
      process.exit();
    });

    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());
    
    

       new UserCreatedListener(natsWrapper.client).listen()
       new TenantCreatedListener(natsWrapper.client).listen()
         
       const httpServer = app.listen(intPort, () => {
        console.log("Listening on port 3000!!!!!!!!");
      });
      
      const io = new SocketIOServer(httpServer, {
        pingTimeout: 60000,
        cors: {
          origin: ["https://cybrosis.intellectx.com", "http://cybrosis.intellectx.com"],
          methods: ["GET", "POST"]
        }
      });
      
    
      
      
    io.on('connection', (socket: Socket) => {
     
      
  socket.on('setup', (userId: string) => {
    console.log(userId,"userId");
    socket.join(userId);
    socket.emit('connected');
  });

  socket.on('join chat', (room: string) => {
    socket.join(room);
    console.log(`User Joined room: ${room}`);
  });

  socket.on('new message', (newMessageReceived: any) => {
    const chatRoomId = newMessageReceived.id; // Assuming you have a unique chat room identifier
    console.log(newMessageReceived);
    
    if (!chatRoomId) {
      return console.log('Chat room ID not defined');
    }
  
    // Emit 'message received' event to the specific chat room
    socket.to(chatRoomId).emit('message received', newMessageReceived);
  });

  socket.on('create-new-room', (data)=>{
      console.log(`host is creating new Room ${{...data}}`);
      const {identity,roomId,userId} = data
       
      const newUser = {
        identity,
        roomHost:true,
        id:userId,
        socketId:socket.id,
        roomId
      }
      connectedUsers = [...connectedUsers,newUser]
      const newRoom = {
        id:roomId,
        connectedUsers:[newUser]
      }

      socket.join(roomId)
      rooms=[...rooms,newRoom]
      console.log(rooms,"roooooooooooooomsssssssssss");
      
      //emit the roomId to the client that create the room
      socket.emit('room-id',{roomId})
      //emit an event to all users connected
      socket.emit('room-update',{connectedUsers: newRoom.connectedUsers})
  })
  socket.on("join-new-room",(data,userId)=>{
    const {identity,roomId} = data
    const newUser = {
      identity,
      id:uuidv4(),
      socketId:socket.id,
      roomId
    }
     
    const room = rooms.find(room => room.id === roomId)
    console.log(rooms);
    
    room.connectedUsers = [...room.connectedUsers,newUser]
    socket.join(roomId,)
    connectedUsers = [...connectedUsers,newUser]
    socket.to(roomId).emit('room-update',{connectedUsers})
  })
});
  
  } catch (err) {
    console.error(err); 
  }  

   
};
 
start(); 
