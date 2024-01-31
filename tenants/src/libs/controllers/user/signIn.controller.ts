import { Request, Response, NextFunction } from "express";
import { BadRequestError, NotAuthorizedError } from "@intellectx/build";
import generateToken from "../../utils/jsonwebtoken";
import { DepenteniciesData } from "../../entities/interfaces";

export = (dependencies: DepenteniciesData): any => {
  const {
    useCases: { signIn_UseCase, getUser_UseCase },
  } = dependencies;

  const signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      if (!email)  return res.status(500).json({"Please provide a email" });
      if (!password) return res.status(500).json({"Please provide a password" });

      const addedUser = await signIn_UseCase(dependencies).execute({
        email,
        password,
      });

      if (!addedUser){
        res.json({msg:"error"})
            throw new BadRequestError("Invalid Credentials");
       
      }else{
        const token: any = generateToken(addedUser);

        req.session = {
          jwt: token,
          userDetails: addedUser,
        };
  
       return res.json({addedUser,jwt:token});
      } 

      
    } catch (error: any) {
      console.log(error);
      
     return res.status(500).json({msg:error.message})
    }
  };
  return signIn;
};
