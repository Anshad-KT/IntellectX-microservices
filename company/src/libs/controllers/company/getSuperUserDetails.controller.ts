

import { Request, Response, NextFunction } from "express";
import { BadRequestError, NotAuthorizedError } from "@intellectx/build";
import generateToken from "../../utils/jsonwebtoken";
import { DepenteniciesData } from "../../entities/interfaces";

export = (dependencies: DepenteniciesData): any => {
  const {
    useCases: { getSuperUserDetails_UseCase },
  } = dependencies;

  const getSuperUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.body;
      const companyName =   req.headers.companyname as string
    
      if (!id) return res.status(500).json({"Please provide a id"}); 
      
      const getSuperUser = await getSuperUserDetails_UseCase(dependencies).execute(id,companyName);



      res.json(getSuperUser);
    } catch (error: any) {
      console.log(error);
      
     return res.status(500).json({msg:error.message})
    }
  };
  return getSuperUser;
};
