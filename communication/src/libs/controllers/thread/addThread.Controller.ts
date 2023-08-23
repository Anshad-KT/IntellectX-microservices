import { Request, Response, NextFunction } from "express";
import { BadRequestError, NotAuthorizedError } from "@intellectx/build";
import generateToken from "../../utils/jsonwebtoken";
import { DepenteniciesData } from "../../entities/interfaces";
import { Channel } from "../../entities/Channel";

export = (dependencies: DepenteniciesData): any => {
  const {
     useCases: { addThread_UseCase,pushThread_UseCase,getChannel_UseCase },
  } = dependencies;

  const addChannel = async (req: Request, res: Response, next: NextFunction) => {
    try {
      
      const { 
        threadName,channelName
      } = req.body;
      const  companyName  = req.subdomains[0]

 
      if (!threadName) throw new BadRequestError("Please provide thread details");
      if (!companyName) throw new BadRequestError("Please provide a password");
      
      
      const {_id} = await addThread_UseCase(dependencies).execute(threadName,channelName,companyName);
  
     
      
      const pushThread = await pushThread_UseCase(dependencies).execute(_id,channelName,companyName);


      if (!pushThread) throw new BadRequestError("Invalid Credentials");

      const getChannel = await getChannel_UseCase(dependencies).execute(req?.session?.userDetails.id,companyName);

      res.json(getChannel);
    
      
    } catch (error: any) {
      console.log(error);
      
      res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
    }
  };
  return addChannel;
};
