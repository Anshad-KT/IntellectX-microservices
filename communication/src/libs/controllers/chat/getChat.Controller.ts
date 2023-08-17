import { Request, Response, NextFunction } from "express";
import { BadRequestError, NotAuthorizedError } from "@intellectx/build";
import generateToken from "../../utils/jsonwebtoken";
import { DepenteniciesData } from "../../entities/interfaces";
import { Channel } from "../../entities/Channel";

export = (dependencies: DepenteniciesData): any => {
  const {
     useCases: { getChat_UseCase },
  } = dependencies;

  const getChat = async (req: Request, res: Response, next: NextFunction) => {
    try {
      
    
      const  companyName  = req.subdomains[0]
      console.log(req.body,"looo");
 
 
      if (!companyName) throw new BadRequestError("Please provide companyName");
 
      
      const addChatResult = await getChat_UseCase(dependencies).execute(req.params.id,companyName);

      if (!addChatResult) throw new BadRequestError("Invalid Credentials");

      res.json(addChatResult);
    
      
    } catch (error: any) {
      console.log(error);
      
      res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
    }
  };
  return getChat;
};
