import { Request, Response, NextFunction } from "express";
import { BadRequestError, NotAuthorizedError } from "@intellectx/build";
import generateToken from "../../utils/jsonwebtoken";
import { DepenteniciesData } from "../../entities/interfaces";

export = (dependencies: DepenteniciesData): any => {
  const {
    useCases: { addSuperUser_UseCase },
  } = dependencies;

  const addSuperUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.body;
      const companyName = req.subdomains[0]
    
      if (!id) throw new BadRequestError("Please provide a id");
      
      const addedSuperUser = await addSuperUser_UseCase(dependencies).execute(id,companyName);

      if (!addedSuperUser) throw new BadRequestError("Invalid Credentials");

      res.json(addedSuperUser);
    } catch (error: any) {
      throw new Error(error);
    }
  };
  return addSuperUser;
};
