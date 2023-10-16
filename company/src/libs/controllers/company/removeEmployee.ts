import { Request, Response, NextFunction } from "express";
import { BadRequestError, NotAuthorizedError } from "@intellectx/build";
import generateToken from "../../utils/jsonwebtoken";
import { DepenteniciesData } from "../../entities/interfaces";

export = (dependencies: DepenteniciesData): any => {
  const {
    useCases: { removeEmployee_UseCase,getEmployeeDetails_UseCase },
  } = dependencies;

  const removeEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {

      const { id } = req.body;
      const  companyName  =   req.headers.companyname as string

    
      if (!id) throw new BadRequestError("Please provide a password");


      const removeEmployee = await removeEmployee_UseCase(dependencies).execute(id,companyName);

      if (!removeEmployee) throw new BadRequestError("Invalid Credentials");

      res.json(removeEmployee);
    } catch (error: any) {
      throw new Error(error);
    }
  };
  return removeEmployee;
};
