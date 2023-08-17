import express from "express";
import {
  currentUser,
  requireAuth,
} from "@intellectx/build";

import { chatController } from "../libs/controllers";
 

export = (dependencies: any) => {
  
  const router = express.Router();
  const {
    addChatController,getChatController
  } = chatController(dependencies); 
  
  router.post("/addchat", addChatController);
  router.get("/getchat/:id",getChatController)
  console.log("why");
  
  return router;
};
