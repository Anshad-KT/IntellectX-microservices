import { UserData, User } from "../../libs/entities";
import { DepenteniciesData } from "../../libs/entities/interfaces";

export const getUser_UseCase = (dependencies: DepenteniciesData) => {
  const {
    repository: { userRepository,tenantRepository },
  } = dependencies;

  if (!userRepository)
    throw new Error("The user repository should be dependencie");

  const execute = async({ username, id, email }: UserData) => {
    const user = new User({ username,  email,id });
    const model = await tenantRepository.getCompanySchema("intellectX-tenants","User")
    return userRepository.getUser(user,model);
  };
  return {
    execute,
  };
};
