import { Request, Response, NextFunction } from "express";
import { DepenteniciesData } from "../../entities/interfaces";

export = (dependencies: DepenteniciesData): any => {
  const {
    useCases: {  getUser_UseCase },
  } = dependencies;

  const currentUser = async (
    req: Request,
    res: Response,
    next: NextFunction 
  ) => {
    try {

      res.json(req.session);
    } catch (error: any) {
      throw new Error(error);
    }
  };
  return currentUser;
};
