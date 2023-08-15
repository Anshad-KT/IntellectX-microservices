import express from "express";
import companyRoutes from "./company";
export const routes = (dependencies: any) => {
  const routes = express.Router();

  const company = companyRoutes(dependencies);

  routes.use("/company", company);
  return routes;
};
