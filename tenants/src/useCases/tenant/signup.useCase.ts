import { Company } from "../../libs/entities/index";
import { UserData, User } from "../../libs/entities";
import { DepenteniciesData, useCaseData } from "../../libs/entities/interfaces";

export const signUp_UseCase = (dependencies: DepenteniciesData) => {
  const {
    repository: { companyRepository },
  } = dependencies;

  if (!companyRepository)
    throw new Error("The company repository should be dependencie");

  const execute = ({companyName,companyEmail,companyDescription,budget,employees,superUsers}:Company) => {
    const company = new Company({companyName,companyEmail,companyDescription,budget,employees,superUsers});
    return companyRepository.signUp(company);
  };
  return {
    execute,
  };
};
