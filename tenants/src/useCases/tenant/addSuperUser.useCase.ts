import { Company } from "../../libs/entities/index";
import { DepenteniciesData } from "../../libs/entities/interfaces";

export const addSuperUser_UseCase = (dependencies: DepenteniciesData) => {
  const {
    repository: { companyRepository },
  } = dependencies;

  if (!companyRepository)
    throw new Error("The company repository should be dependencie");

    const execute = (comapanyId:string,id:any) => {
 
    return companyRepository.addSuperUser(comapanyId,id)
  };
  return {
    execute,
  };
};
