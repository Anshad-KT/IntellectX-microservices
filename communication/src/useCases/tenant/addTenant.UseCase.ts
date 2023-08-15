import { DepenteniciesData } from "../../libs/entities/interfaces";


export const addTenant_UseCase = (dependencies: DepenteniciesData) => {
  const {
    repository: { tenantRepository },
  } = dependencies;

  if (!tenantRepository)
    throw new Error("The company repository should be dependencie");

  const execute = async(companyName:any) => {

    const model = await tenantRepository.getCompanySchema("intellectX-tenants","Tenant")
    
    
    return tenantRepository.signUp(companyName.tenantName,model);
  };
  return {
    execute,
  };
};
