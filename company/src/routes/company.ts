import express from "express";
import {
  currentUser,
  requireAuth,
} from "@intellectx/build";

import { employeeController } from "../libs/controllers";

export = (dependencies: any) => {
  
  const router = express.Router();
  const {
    getEmployeeController,generateLinkController,verifygeneratedLinkController
  } = employeeController(dependencies); 

  router.get('/getemployee', getEmployeeController)
  router.post('/verifylink', verifygeneratedLinkController)
  router.get('/generatelink', generateLinkController)
  return router;
};
