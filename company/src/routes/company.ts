import express from "express";
import {
  currentUser,
  requireAuth,
} from "@intellectx/build";

import { companyController, employeeController } from "../libs/controllers";

export = (dependencies: any) => {
  
  const router = express.Router();
  const {
    getEmployeeController,generateLinkController,verifygeneratedLinkController,
  } = employeeController(dependencies); 
  const {
    getSuperUserController
  } = companyController(dependencies)
  
  router.get('/getemployee', getEmployeeController)
  router.post('/verifylink', verifygeneratedLinkController)
  router.get('/generatelink', generateLinkController)
  router.post('/getsuperuser', getSuperUserController)

  return router;
};
