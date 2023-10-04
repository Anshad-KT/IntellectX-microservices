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
      const  companyName  = req.subdomains[0]

 
      if (!channel) throw new BadRequestError("Please provide employee details");
      if (!companyName) throw new BadRequestError("Please provide a password");
      
      console.log("shanu0",req.body);
      const addChannel = await addChannel_UseCase(dependencies).execute(channel,companyName);
;
console.log(addChannel,"shahiiinuuu");

      if (!addChannel) throw new BadRequestError("Invalid Credentials");

      res.json(addChannel);
    
      
    } catch (error: any) {
      console.log(error);
      
      res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
    }
  };
  return addChannel;
};
