import { UserData, User } from "../../libs/entities";
import { DepenteniciesData } from "../../libs/entities/interfaces";

export const verifyGeneratedLink_UseCase = (dependencies: DepenteniciesData) => {
  const {
    repository: { companyRepository,tenantRepository },
  } = dependencies;

  if (!companyRepository)
    throw new Error("The user repository should be dependencie");

  const execute = async ({id,link}:{id:string,link:string},companyName:string) => {
    const companyModel = await tenantRepository.getCompanySchema(companyName,"Company")
    const result = await companyRepository.verifyGeneratedLink(companyName,companyModel);
    console.log(result);
    
    if(result) {
        const model = await tenantRepository.getCompanySchema(companyName,"Employee")
        console.log(model,id,result,"--------------");
        
        return companyRepository.addEmployee({id},model)
    }
    console.log(id,result,"+++++++");
    return result
  };
  return {
    execute,
  };
};
