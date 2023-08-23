import express, { Router } from "express";
import { body, validationResult } from "express-validator";
import {

  currentUser,
  requireAuth,
} from "@intellectx/build";

import { userController } from "../libs/controllers";

export = (dependencies: any) => {
  const router = express.Router();
  const {
    signUpController,
    currentuserController,
    signInController,
    signOutController,
  } = userController(dependencies);

  router.post("/signup", signUpController);
  router.post("/login", signInController);
  router.post("/signout", signOutController);
//  router.get("/currentuser", currentUser, requireAuth, currentuserController);

  return router;
};
