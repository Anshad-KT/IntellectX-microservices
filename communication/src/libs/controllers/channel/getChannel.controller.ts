import { Request, Response, NextFunction } from "express";
import { BadRequestError, NotAuthorizedError } from "@intellectx/build";
import generateToken from "../../utils/jsonwebtoken";
import { DepenteniciesData } from "../../entities/interfaces";
import { Channel } from "../../entities/Channel";
import { getChannel_UseCase } from "../../../useCases";

export = (dependencies: DepenteniciesData): any => {
  const {
     useCases: { getChannel_UseCase },
  } = dependencies;

  const addChannel = async (req: Request, res: Response, next: NextFunction) => {
    try {
      
  
    
      const  companyName  =   req.headers.companyname as string
    
    
      
 
    
      if (!companyName) throw new BadRequestError("Please provide a company");
  
      
     
      const addChannel = await getChannel_UseCase(dependencies).execute(req?.session?.userDetails.id,companyName);

      if (!addChannel) throw new BadRequestError("Invalid Credentials");

      res.json(addChannel);
   
    
      
    } catch (error: any) {
      console.log(error);
      
     return res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
    }
  };
  return addChannel;
};
