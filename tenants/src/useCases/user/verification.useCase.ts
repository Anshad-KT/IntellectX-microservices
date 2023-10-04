import { UserData, User } from "../../libs/entities";
import { DepenteniciesData } from "../../libs/entities/interfaces";

export const verification_UseCase = (dependencies: DepenteniciesData) => {
  const {
    repository: { userRepository },
  } = dependencies;

  if (!userRepository)
    throw new Error("The user repository should be dependencie");

  const execute = (link:string,sessionValue:any) => {
    console.log(link,sessionValue);
    
    if(sessionValue == link){
        return true
    }else{
        return false
    }
  };
  return {
    execute,
  };
};
