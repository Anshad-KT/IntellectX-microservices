import { Request, Response, NextFunction } from "express";
import { BadRequestError, NotAuthorizedError } from "@intellectx/build";
import generateToken from "../../utils/jsonwebtoken";
import { DepenteniciesData } from "../../entities/interfaces";
import { Channel } from "../../entities/Channel";

export = (dependencies: DepenteniciesData): any => {
  const {
     useCases: { addChat_UseCase,pushChat_UseCase },
  } = dependencies;

  const addChannel = async (req: Request, res: Response, next: NextFunction) => {
    try {
      
      const { 
        from,fileType,content,threadName
          } = req.body;
      const  companyName  =   req.headers.companyname as string
     
 
      if (!from) throw new BadRequestError("Please provide from details");
      if (!fileType) throw new BadRequestError("Please provide fileType");
      if (!content) throw new BadRequestError("Please provide content");
      
      const addChatResult = await addChat_UseCase(dependencies).execute(from,fileType,content,companyName);
     
      const addToThreadResult = await pushChat_UseCase(dependencies).execute(addChatResult._id,threadName,companyName)
      
     
 
      res.json(addChatResult);
    
      
    } catch (error: any) {
      console.log(error);
      
     return res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
    }
  };
  return addChannel;
};
