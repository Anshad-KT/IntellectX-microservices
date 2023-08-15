import express from "express";
import {
  currentUser,
  requireAuth,
} from "@intellectx/build";

import { threadController } from "../libs/controllers";


export = (dependencies: any) => {
  
  const router = express.Router();
  const {
    addThreadController
  } = threadController(dependencies); 
  
  router.post("/addthread", addThreadController);
  return router;
};
