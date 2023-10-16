import { Request, Response, NextFunction } from "express";
import { BadRequestError, NotAuthorizedError } from "@intellectx/build";
import generateToken from "../../utils/jsonwebtoken";
import { DepenteniciesData } from "../../entities/interfaces";

export = (dependencies: DepenteniciesData): any => {
  const {
    useCases: { addEmployee_UseCase,getEmployeeDetails_UseCase },
  } = dependencies;

  const addEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try { 
      
      const employeeDetails = req.body;
      const  companyName  =   req.headers.companyname as string
 
      if (!employeeDetails) throw new BadRequestError("Please provide employee details");
      if (!companyName) throw new BadRequestError("Please provide a password");
      
      // const employeeDetails = await getEmployeeDetails_UseCase(dependencies).execute(id,companyName)
      const addEmployee = await addEmployee_UseCase(dependencies).execute(employeeDetails,companyName);


      if (!addEmployee) throw new BadRequestError("Invalid Credentials");

      res.json(addEmployee);
    } catch (error: any) {
      throw new Error(error);
    }
  };
  return addEmployee;
};
