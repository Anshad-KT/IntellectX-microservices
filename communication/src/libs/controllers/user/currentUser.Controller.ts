import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "@intellectx/build";
import { DepenteniciesData } from "../../entities/interfaces";

export = (dependencies: DepenteniciesData): any => {
  const {
     useCases: { getUser_UseCase },
  } = dependencies;

  const currentUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      
      const { 
        id
      } = req.params;
      const  companyName  =   req.headers.companyname as string
console.log(id);

 
      if (!id) throw new BadRequestError("Please provide Id");
      if (!companyName) throw new BadRequestError("Please provide a companyName");
      
      const response = await getUser_UseCase(dependencies).execute(id,companyName);
  console.log(response);
  
      res.json(response);  
      
    } catch (error: any) {
      console.log(error);
      
      res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
    }
  };
  return currentUser;
};
