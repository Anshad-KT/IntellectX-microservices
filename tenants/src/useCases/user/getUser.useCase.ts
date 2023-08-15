import { UserData, User } from "../../libs/entities";
import { DepenteniciesData } from "../../libs/entities/interfaces";

export const getUser_UseCase = (dependencies: DepenteniciesData) => {
  const {
    repository: { userRepository },
  } = dependencies;

  if (!userRepository)
    throw new Error("The user repository should be dependencie");

  const execute = ({ username, password, email }: UserData) => {
    const user = new User({ username, password, email });
    return userRepository.getUser(user);
  };
  return {
    execute,
  };
};
