import { UserData, User } from "../../libs/entities";
import { DepenteniciesData } from "../../libs/entities/interfaces";
import sendOtpEmail from "../../libs/utils/nodemailer";

export const getOtp_UseCase = (dependencies: DepenteniciesData) => {
  const {
    repository: { userRepository },
  } = dependencies;

  if (!userRepository)
    throw new Error("The user repository should be dependencies i guess");

  const execute = (email:string) => {
   
    
    
    return sendOtpEmail("intellectx303@gmail.com",email);

  };
  return {
    execute,
  };
};
