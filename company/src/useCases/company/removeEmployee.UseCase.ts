import { Company } from "../../libs/entities/index";
import { DepenteniciesData } from "../../libs/entities/interfaces";

export const removeEmployee_UseCase = (dependencies: DepenteniciesData) => {
  const {
    repository: { companyRepository,tenantRepository },
  } = dependencies;

  if (!companyRepository)
    throw new Error("The company repository should be dependencie");

    const execute = async(id:string,companyName:string) => {
    const model = await tenantRepository.getCompanySchema(companyName,"Company")
    return companyRepository.removeEmployee(id,model)
  };
  return {
    execute,
  };
};
