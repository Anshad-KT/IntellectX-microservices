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

    
    const user = new User({ username, id, email });
    return userRepository.signUp(user,model);
  };
  return {
    execute,
  };
};
