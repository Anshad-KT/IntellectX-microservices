import { Company } from "../../libs/entities/index";
import { UserData, User } from "../../libs/entities";
import { DepenteniciesData } from "../../libs/entities/interfaces";

export const removeSuperUser_UseCase = (dependencies: DepenteniciesData) => {
  const {
    repository: { companyRepository,tenantRepository },
  } = dependencies;

  if (!companyRepository)
    throw new Error("The company repository should be dependencie");

    const execute = async(companyName:string,id:any) => {
    const model = await tenantRepository.getCompanySchema(companyName,"Company")
    return companyRepository.removeEmployee(id,model)
  };
  return {
    execute,
  };
};
