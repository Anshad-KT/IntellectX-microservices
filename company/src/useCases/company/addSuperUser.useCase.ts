import { Company } from "../../libs/entities/index";
import { DepenteniciesData } from "../../libs/entities/interfaces";

export const addSuperUser_UseCase = (dependencies: DepenteniciesData) => {
  const {
    repository: { companyRepository,tenantRepository },
  } = dependencies;

  if (!companyRepository)
    throw new Error("The company repository should be dependencie");

    const execute = async(comapanyName:string,id:any) => {
    const model = await tenantRepository.getCompanySchema(comapanyName,"Company")
    return companyRepository.addSuperUser(id,model)
  };
  return {
    execute,
  };
};
