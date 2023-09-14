// import { UserData, User } from "../../libs/entities";
import { DepenteniciesData } from "../../libs/entities/interfaces";

export const getUser_UseCase = (dependencies: DepenteniciesData) => {
  const {
    repository: { userRepository,tenantRepository },
  } = dependencies;

  if (!userRepository)
    throw new Error("The user repository should be dependencie");

  const execute = async (id:string,companyName:string) => {
    const UserModel = await tenantRepository.getCompanySchema("intellectX-tenants","User")
    const ThreadModel = await tenantRepository.getCompanySchema(companyName,"Thread")
    return userRepository.getUser(id,UserModel,ThreadModel);
  };
  return {
    execute,
  };
};
