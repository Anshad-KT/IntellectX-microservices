import express from "express";
import {
  currentUser,
  requireAuth,
} from "@intellectx/build";

import { employeeController } from "../libs/controllers";

export = (dependencies: any) => {
  
  const router = express.Router();
  const {
    getEmployeeController
  } = employeeController(dependencies); 

  router.get('/getemployee', getEmployeeController)
  return router;
};
