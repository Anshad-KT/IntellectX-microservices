import { UserData, User } from "../../libs/entities";
import { DepenteniciesData } from "../../libs/entities/interfaces";

export const generateLink_UseCase = (dependencies: DepenteniciesData) => {
  const {
    repository: { companyRepository,tenantRepository },
  } = dependencies;

  if (!companyRepository)
    throw new Error("The user repository should be dependencie");

  const execute = async (companyName:string) => {
    const companyModel = await tenantRepository.getCompanySchema(companyName,"Company")
    console.log(companyName,companyModel);
    
    return companyRepository.generateLink(companyName,companyModel);
  };
  return {
    execute,
  };
};
