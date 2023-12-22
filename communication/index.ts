import mongoose from "mongoose";
import { app } from "./app";
import { connectDB } from "./src/config/db";
import { intPort } from "./src/config/port";
import { natsWrapper } from "./nats-wrapper";
import { UserCreatedListener } from "./src/events/listeners/user-created-listener";
import {TenantCreatedListener } from "./src/events/listeners/tenant-created-listener";
import { Server as SocketIOServer, Socket } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';

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
    // Check if the socket is already in the specified room
    if (!socket.rooms.has(room)) {
      // If not, join the room
      socket.join(room);
      console.log(`User Joined room: ${room}`);
    } else {
      console.log(`User is already in room: ${room}`);
    }
  });
  

  socket.on('new message', (newMessageReceived: any) => {
    const chatRoomId = newMessageReceived.id; 
    console.log('new message',newMessageReceived);
    
    if (!chatRoomId) {
      return console.log('Chat room ID not defined');
    }
  
    
    console.log(chatRoomId);
    
    socket.to(chatRoomId).emit('message received', newMessageReceived);
  });
  socket.on("join-video-chat", async ({roomId, user_id}) => {
    await socket.join(roomId)
    socket.to(roomId).emit("newUser", user_id)
})

socket.on("sendMessageToPeer",(data) =>{
  if(data.type=="offer"||data.type=="answer"){
    console.log(`from ${data.user_id} to ${data.remoteUser_id} type: ${data.type} `);

  }
    socket.to(data.roomId).emit("receivedPeerToPeer",data)
})

socket.on("call-end",({remoteUser_id,roomId})=>{
  console.log({remoteUser_id,roomId});
  
  socket.to(roomId).emit("call-end",{remoteUser_id,roomId})
  socket.leave(roomId)
})

  
}); 
  
  } catch (err) {
    console.error(err); 
  }  

   
};
 
start(); 
