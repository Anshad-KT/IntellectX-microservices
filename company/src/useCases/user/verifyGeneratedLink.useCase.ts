import { UserData, User } from "../../libs/entities";
import { DepenteniciesData } from "../../libs/entities/interfaces";

export const verifyGeneratedLink_UseCase = (dependencies: DepenteniciesData) => {
  const {
    repository: { companyRepository,tenantRepository },
  } = dependencies;

  if (!companyRepository)
    throw new Error("The user repository should be dependencie");

  const execute = async ({id,link}:{id:string,link:string}) => {

    
    const regxArray =  link.match(/\.cloud\.(\w+)\.invite/) as RegExpMatchArray
    console.log(regxArray);
    
    const companyName = regxArray[1]
    const companyModel = await tenantRepository.getCompanySchema(companyName,"Company")
    let result = await companyRepository.verifyGeneratedLink(companyName,companyModel);
    console.log(companyName,regxArray);
    let i=true
    if(i) {
        const model = await tenantRepository.getCompanySchema(companyName,"Employee")
       
        
        return { companyName, result: await companyRepository.addEmployee({ id }, model) };
    }
  
   
    return result
  };
  return {
    execute,
  };
};
