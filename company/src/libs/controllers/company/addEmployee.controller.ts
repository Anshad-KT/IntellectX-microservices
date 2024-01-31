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
 
      if (!employeeDetails) return res.status(500).json({"Please provide emoyeeDetails" });
      if (!companyName) return res.status(500).json({"Please provide companyName" });
      
      // const employeeDetails = await getEmployeeDetails_UseCase(dependencies).execute(id,companyName)
      const addEmployee = await addEmployee_UseCase(dependencies).execute(employeeDetails,companyName);


      if (!addEmployee) return res.status(500).json({"Error adding employees"});

      res.json(addEmployee);
    } catch (error: any) {
      console.log(error);
      
     return res.status(500).json({msg:error.message})
    }
  };
  return addEmployee;
};
