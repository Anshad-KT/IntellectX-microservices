import e, { Request, Response, NextFunction } from "express";
import { BadRequestError } from "@intellectx/build";
import { DepenteniciesData } from "../../entities/interfaces";


export = (dependencies: DepenteniciesData): any => {
  const {
    useCases: { getUser_UseCase,getOtp_UseCase },
  } = dependencies;
 
  const otp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const email = req.params.id;
   
      
      if (!email) throw new BadRequestError("Please provide a email");

      const getUser = await getUser_UseCase(dependencies).execute(email)
console.log(getUser,email);

      if(getUser){
        const verifiedUser = await getOtp_UseCase(dependencies).execute(
        email
      ); 
      console.log(verifiedUser);
        req.session!.otp = verifiedUser.otp
        res.json(verifiedUser)
      
      }else{
        console.log("shi");
        
      res.status(404).json({message:"user not found"});
      }
 
    } catch (error: any) {
    console.log(error);
    
      throw new Error(error);
    }
  };
  return otp;
};
