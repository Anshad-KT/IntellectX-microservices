import mongoose from "mongoose";
import { UserData, User } from "../../libs/entities";
import { DepenteniciesData } from "../../libs/entities/interfaces";

export const signUp_UseCase = (dependencies: DepenteniciesData) => {
  const {
    repository: { userRepository,tenantRepository },
  } = dependencies;

  if (!userRepository)
    throw new Error("The user repository should be dependencie");

  const execute = async({ username, id, email }: UserData) => {
    const model = await tenantRepository.getCompanySchema("intellectX-tenants","User")
   
    const details = {username,id:new mongoose.Types.ObjectId(id),email}
    const user = new User(details);
  
    
    return userRepository.signUp(user,model);
  };
  return {
    execute,
  };
};
