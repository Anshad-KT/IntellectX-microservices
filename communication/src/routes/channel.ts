import express from "express";
import {
  currentUser,
  requireAuth,
} from "@intellectx/build";

import { channelController } from "../libs/controllers";


export = (dependencies: any) => {
  
  const router = express.Router();
  const {
    addChannelController,getChannelController
  } = channelController(dependencies); 
  router.post("/addchannel", addChannelController);
  router.get('/getchannel', getChannelController)
  return router;
};
