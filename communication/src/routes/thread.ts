import express from "express";
import {
  currentUser,
  requireAuth,
} from "@intellectx/build";

import { threadController, userController } from "../libs/controllers";


export = (dependencies: any) => {
  
  const router = express.Router();
  const {
    addThreadController,saveThreadController
  } = threadController(dependencies); 
  const { getUserController } = userController(dependencies)
  router.post("/addthread", addThreadController);
  router.post("/saveThread", saveThreadController);
  
  router.get("/currentuser/:id",  getUserController);

  return router;
};
