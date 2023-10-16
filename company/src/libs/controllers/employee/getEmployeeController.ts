import { Request, Response, NextFunction } from "express";
import { BadRequestError, NotAuthorizedError } from "@intellectx/build";
import generateToken from "../../utils/jsonwebtoken";
import { DepenteniciesData } from "../../entities/interfaces";

export = (dependencies: DepenteniciesData): any => {
  const {
    useCases: { getEmployee_UseCase },
  } = dependencies;

  const getEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
 
      const companyName =   req.headers.companyname as string
    
      
      
      const employees = await getEmployee_UseCase(dependencies).execute(companyName);

      if (!employees) throw new BadRequestError("Invalid Credentials");

res.json(employees);
            
    } catch (error: any) {
      throw new Error(error);
    }
  };
  return getEmployee;
};
