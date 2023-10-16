import { Request, Response, NextFunction } from "express";
import { BadRequestError, NotAuthorizedError } from "@intellectx/build";

import { DepenteniciesData } from "../../../libs/entities/interfaces";

export = (dependencies: DepenteniciesData): any => {
  const {
    useCases: { generateLink_UseCase },
  } = dependencies;

  const signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      
      const companyName =   req.headers.companyname as string
  
      const generateLink = await generateLink_UseCase(dependencies).execute(
        companyName
      );
      console.log(generateLink);
      res.json(generateLink) 
      
    } catch (error: any) {
      throw new Error(error);
    }
  };
  return signIn;
};
