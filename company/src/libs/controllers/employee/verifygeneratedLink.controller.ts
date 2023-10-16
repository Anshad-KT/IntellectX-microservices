import { Request, Response, NextFunction } from "express";
import { BadRequestError, NotAuthorizedError } from "@intellectx/build";

import { DepenteniciesData } from "../../../libs/entities/interfaces";

export = (dependencies: DepenteniciesData): any => {
  const {
    useCases: { verifyGeneratedLink_UseCase },
  } = dependencies;

  const signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      
      const { id,link } = req.body 
      const companyName =  req.headers.companyname as string
      console.log(req.body);
      
      const generatedResult = await verifyGeneratedLink_UseCase(dependencies).execute(
      {id,link},companyName
      );
      console.log(generatedResult,"everything i sfine, closer to finsh thigns off");
      res.json(generatedResult) 
      
    } catch (error: any) {
      throw new Error(error);
    }
  };
  return signIn;
};
