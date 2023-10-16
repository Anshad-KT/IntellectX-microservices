import { UserData, User } from "../../libs/entities";
import { DepenteniciesData } from "../../libs/entities/interfaces";

export const signUp_UseCase = (dependencies: DepenteniciesData) => {
  const {
    repository: { userRepository },
  } = dependencies;

  if (!userRepository)
    throw new Error("The user repository should be dependencie");

  const execute = ({ username, password, email,currentCompany }: UserData) => {
    const user = new User({ username, password, email,currentCompany });
    return userRepository.signUp(user);
  };
  return {
    execute,
  };
};
