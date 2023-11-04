import express from "express";
import channelRoutes from "./channel";
import chatRoutes from "./chat"
import threadRoutes from "./thread"

export const routes = (dependencies: any) => {
  const routes = express.Router();

  const channel = channelRoutes(dependencies);
  const thread = threadRoutes(dependencies)
  const chat = chatRoutes(dependencies)
 
  routes.use("/communication/thread", thread)
  routes.use("/communication/chat",chat)
  routes.use("/communication", channel);
  

  return routes;
};
