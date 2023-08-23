import { DepenteniciesData } from "../../libs/entities/interfaces";
import { Tenant, TenantData } from "../../libs/entities";


export const addTenant_UseCase = (dependencies: DepenteniciesData) => {
  const {
    repository: { tenantRepository },
  } = dependencies;

  if (!tenantRepository)
    throw new Error("The company repository should be dependencie");

  const execute = (companyName:any) => {

    
    return tenantRepository.signUp(companyName);
  };
  return {
    execute,
  };
};
