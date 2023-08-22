import e, { Request, Response, NextFunction } from "express";
import { BadRequestError, NotAuthorizedError } from "@intellectx/build";
import generateToken from "../../utils/jsonwebtoken";
import { UserRegisteredPublisher } from "../../../events/publishers/user-registered-publisher";
import { natsWrapper } from "../../../../nats-wrapper";
import { DepenteniciesData } from "../../entities/interfaces";

export = (dependencies: DepenteniciesData): any => {
  const {
    useCases: { signUp_UseCase, getUser_UseCase },
  } = dependencies;
 
  const signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, email, password } = req.body;
      console.log(req.body);
      
      if (!username) throw new BadRequestError("Please provide a username");
      if (!email) throw new BadRequestError("Please provide a email");
      if (!password) throw new BadRequestError("Please provide a password");
      
      const userPresent = await getUser_UseCase(dependencies).execute({
        username,
        email,
        password,
      });

      console.log(userPresent + "user is present");
      if (userPresent.length) {
        throw new BadRequestError("Email already in use !");
      }

      const addedUser = await signUp_UseCase(dependencies).execute({
        username,
        email,
        password,
      });

      const token: any = generateToken(addedUser);

      req.session = {
        jwt: token,
        userDetails: addedUser,
      };

      await new UserRegisteredPublisher(natsWrapper.client).publish({
        id: addedUser!.id,
        email: addedUser!.email,
        username:addedUser!.username,
        version:addedUser!.version
      });

      res.json(addedUser);
      console.log(req.session);
      
    } catch (error: any) {
      res.json({msg:"something went wrong"})
      throw new Error(error);
    }
  };
  return signUp;
};
