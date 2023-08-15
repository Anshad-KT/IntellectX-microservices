import { Company } from "../../libs/entities/index";
import { UserData, User } from "../../libs/entities";
import { DepenteniciesData, useCaseData } from "../../libs/entities/interfaces";
import mongoose from "mongoose";

export const company_SignUp_UseCase = (dependencies: DepenteniciesData) => {
  const {
    repository: { companyRepository,tenantRepository },
  } = dependencies;

  if (!companyRepository)
    throw new Error("The company repository should be dependencie");

  const execute = async({id,companyName,companyEmail,budget,superUsers}:{id:string,companyName:string,companyEmail:string,budget:number,superUsers:string},companyTitle:string) => {
    
    
    const superUserId = new mongoose.Types.ObjectId(superUsers);
   
    
    const employee = {
      id,
      companyName,
      companyEmail,
      budget,
      superUsers:[
        new mongoose.Types.ObjectId(superUserId)
      ]  
    }
   
    
    const model = await tenantRepository.getCompanySchema(companyName,"Company")
   console.log(await model?.find());
   
    
    return companyRepository.signUp(employee,model);
  };
  return {
    execute,
  };
};
