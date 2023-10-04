import e, { Request, Response, NextFunction } from "express";
import { BadRequestError, NotAuthorizedError } from "@intellectx/build";
import generateToken from "../../utils/jsonwebtoken";
import { UserRegisteredPublisher } from "../../../events/publishers/user-registered-publisher";
import { natsWrapper } from "../../../../nats-wrapper";
import { DepenteniciesData } from "../../entities/interfaces";

export = (dependencies: DepenteniciesData): any => {
  const {
    useCases: { verification_UseCase },
  } = dependencies;
 
  const verification = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { otp } = req.body;
   
      
      if (!otp) throw new BadRequestError("Please provide a otp");
      if(!req.session){
        console.log("no session");
        return
      }
      const verifiedUser = await verification_UseCase(dependencies).execute(
        otp,req.session.otp
      ); 

      res.json(verifiedUser);      
      
    } catch (error: any) {
      res.json({msg:"something went wrong"})
      throw new Error(error);
    }
  };
  return verification;
};
