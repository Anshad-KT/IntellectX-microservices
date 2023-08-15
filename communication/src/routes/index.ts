import express from "express";
import channelRoutes from "./channel";
import threadRoutes from "./thread"

export const routes = (dependencies: any) => {
  const routes = express.Router();

  const channel = channelRoutes(dependencies);
  const thread = threadRoutes(dependencies)

  routes.use("/communication/thread", thread)
  console.log("klk");
  
  routes.use("/communication", channel);

  return routes;
};
