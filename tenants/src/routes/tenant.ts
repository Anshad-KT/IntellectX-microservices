import express from "express";
import {
  currentUser,
  requireAuth,
} from "@intellectx/build";

import { tenantController } from "../libs/controllers";

export = (dependencies: any) => {
  const router = express.Router();
  const {
    addTenantController
  } = tenantController(dependencies);

  router.post("/addtenant",
  addTenantController);
  return router;
}; 
