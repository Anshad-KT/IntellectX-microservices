import { Company } from "../../libs/entities/index";
import { UserData, User } from "../../libs/entities";
import { DepenteniciesData } from "../../libs/entities/interfaces";

export const removeSuperUser_UseCase = (dependencies: DepenteniciesData) => {
  const {
    repository: { companyRepository },
  } = dependencies;

  if (!companyRepository)
    throw new Error("The company repository should be dependencie");

    const execute = (comapanyId:string,id:any) => {
 
    return companyRepository.removeEmployee(comapanyId,id)
  };
  return {
    execute,
  };
};
