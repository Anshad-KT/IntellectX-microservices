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
    getOtpController,
    otpVerifyController
  } = userController(dependencies);

  router.post("/signup", signUpController);
  router.post("/login", signInController);
  router.post("/signout", signOutController);
  router.post("/verifyUser",otpVerifyController)
  router.get("/otp/:id",getOtpController)
//  router.get("/currentuser", currentUser, requireAuth, currentuserController);

  return router;
};
