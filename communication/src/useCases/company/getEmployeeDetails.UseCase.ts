
import { UserData, User, CompanyData,Company } from "../../libs/entities";
import { DepenteniciesData } from "../../libs/entities/interfaces";

export const getEmployeeDetails_UseCase = (dependencies: DepenteniciesData) => {
  const {
    repository: { companyRepository,tenantRepository },
  } = dependencies;

  if (!companyRepository)
    throw new Error("The company repository should be a included dependencies");

    const execute = async(id:string,companyName:string) => {
    const model = await tenantRepository.getCompanySchema(companyName,"Company")
    return companyRepository.getUser(id,model);
  };
  return {
    execute,
  };
};
