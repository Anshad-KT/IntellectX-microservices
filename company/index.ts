import mongoose from "mongoose";
import { app } from "./app";
import { connectDB } from "./src/config/db";
import { intPort } from "./src/config/port";
import { natsWrapper } from "./nats-wrapper";
import { UserCreatedListener } from "./src/events/listeners/user-created-listener";
import {TenantCreatedListener } from "./src/events/listeners/tenant-created-listener";


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

  try { 
    await natsWrapper.connect(
      "ticketing",
      //process.env.NATS_CLIENT_ID,
       "compas", 
      "http://nats-srv:4222"  
    )    
    natsWrapper.client.on("close", () => { 
      console.log("NATS connetion closed!"); 
      process.exit();
    });  

    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());
    
    
   
       new UserCreatedListener(natsWrapper.client).listen()
       
       new TenantCreatedListener(natsWrapper.client).listen();
       
    // connectDB();
  } catch (err) {
    console.error(err);  
  }  

  app.listen(intPort, () => {
    console.log("Listening on port 3000!d!!!!!!!");
  });
};

start();
