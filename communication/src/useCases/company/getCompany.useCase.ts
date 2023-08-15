import { tenantRepository } from "../../libs/app/repository/mongo";
import { UserData, User, CompanyData,Company } from "../../libs/entities";
import { DepenteniciesData } from "../../libs/entities/interfaces";

export const getCompany_UseCase = (dependencies: DepenteniciesData) => {
  const {
    repository: { companyRepository,tenantRepository },
  } = dependencies;

  if (!companyRepository)
    throw new Error("The company repository should be a included dependencies");

  const execute = async(id:string,companyName:string) => {
    const companySchema = await tenantRepository.getCompanySchema(companyName,"Company")
    return companyRepository.getCompany(id,companySchema);
  };
  return {
    execute,
  };
};
