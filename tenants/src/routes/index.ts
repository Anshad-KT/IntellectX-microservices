import express from "express";
import tenantRoutes from "./tenant";
import userRoutes from './user'

export const routes = (dependencies: any) => {

  const routes = express.Router();
  const user = userRoutes(dependencies)
  const tenant = tenantRoutes(dependencies);
  
  routes.use("/tenant/user",user)
  routes.use("/tenant", tenant);
  
  return routes;
};
  