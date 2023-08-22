import express, { Request, Response } from "express";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { routes } from "./src/routes";
import ErrorHandler from "./src/libs/utils/ErrorHnadler";
import {               
  NotFoundError,  
} from "@intellectx/build"; 
import depentencies from "./src/config/depentencies";
      
const app = express();
  
app.set("trust proxy", true) 
app.use(json()); 
           
app.use(   
  cookieSession({
    signed: false,
  })     
)          
app.use("/api", routes(depentencies));
app.all("*", async (req, res) => {
  throw new NotFoundError();
})  
app.use(ErrorHandler);
 
export { app };