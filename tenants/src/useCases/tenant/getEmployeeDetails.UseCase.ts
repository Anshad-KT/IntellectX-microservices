
import { UserData, User, CompanyData,Company } from "../../libs/entities";
import { DepenteniciesData } from "../../libs/entities/interfaces";

export const getEmployeeDetails_UseCase = (dependencies: DepenteniciesData) => {
  const {
    repository: { companyRepository },
  } = dependencies;

  if (!companyRepository)
    throw new Error("The company repository should be a included dependencies");

  const execute = (id:string) => {
    return companyRepository.getUser(id,schemass);
  };
  return {
    execute,
  };
};
