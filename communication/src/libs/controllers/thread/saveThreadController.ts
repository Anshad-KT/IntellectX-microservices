import { Request, Response, NextFunction } from "express";
import { BadRequestError, NotAuthorizedError } from "@intellectx/build";
import generateToken from "../../utils/jsonwebtoken";
import { DepenteniciesData } from "../../entities/interfaces";
import { Channel } from "../../entities/Channel";
import mongoose from "mongoose";

export = (dependencies: DepenteniciesData): any => {
  const {
     useCases: { saveThread_UseCase },
  } = dependencies;

  const saveThread = async (req: Request, res: Response, next: NextFunction) => {
    try {
      
      const { 
        threadId,id
      } = req.body;
      const  companyName  =   req.headers.companyname as string

 
      if (!threadId) throw new BadRequestError("Please provide thread Id");
      if (!companyName) throw new BadRequestError("Please provide a companyName");
      
      const response = await saveThread_UseCase(dependencies).execute(new mongoose.Types.ObjectId(threadId),companyName,id);
  console.log(response);
  
      res.json(response);  
      
    } catch (error: any) {
      console.log(error);
      
      res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
    }
  };
  return saveThread;
};
