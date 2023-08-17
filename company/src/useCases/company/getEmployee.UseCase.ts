
import { UserData, User, CompanyData,Company } from "../../libs/entities";
import { DepenteniciesData } from "../../libs/entities/interfaces";

export const getEmployee_UseCase = (dependencies: DepenteniciesData) => {
  const {
    repository: { companyRepository,tenantRepository },
  } = dependencies;

  if (!companyRepository)
    throw new Error("The company repository should be a included dependencies");

    const execute = async(companyName:string) => {
    const model = await tenantRepository.getCompanySchema(companyName,"Employee")
    return companyRepository.getEmployee(model);
  };
  return {
    execute,
  };
};
