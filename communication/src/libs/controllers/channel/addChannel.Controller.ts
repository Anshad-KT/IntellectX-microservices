import { Request, Response, NextFunction } from "express";
import { BadRequestError, NotAuthorizedError } from "@intellectx/build";
import generateToken from "../../utils/jsonwebtoken";
import { DepenteniciesData } from "../../entities/interfaces";
import { Channel } from "../../entities/Channel";

export = (dependencies: DepenteniciesData): any => {
  const {
     useCases: { addChannel_UseCase },
  } = dependencies;

  const addChannel = async (req: Request, res: Response, next: NextFunction) => {
    try {
      
      const channel:{
        creator: string,
        channelName: string,
        superUsers: string[], // Array of strings
        previlagedUsers: string[], // Array of strings
        threads: string[], // Array of strings
      } = req.body;
   
      
      const companyName =  req.headers.companyname as string

 
      if (!channel) return res.status(500).json({ "No channel present" });
      if (!companyName) return res.status(500).json({"No company present" });
      
      
      const addChannel = await addChannel_UseCase(dependencies).execute(channel,companyName);
;


      if (!addChannel) return res.status(500).json({ "Internal Server Error" });

      res.json(addChannel);
    
      
    } catch (error: any) {
      console.log(error);
      
     return res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
    }
  };
  return addChannel;
};
