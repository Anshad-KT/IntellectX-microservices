import { EmployeeAttrs } from "../../libs/app/database/mongo/schemas/company/employee.schema";

import { Company } from "../../libs/entities/index";
import { DepenteniciesData } from "../../libs/entities/interfaces";

export const addEmployee_UseCase = (dependencies: DepenteniciesData) => {
  const {
    repository: { companyRepository,tenantRepository },
  } = dependencies;

  if (!companyRepository)
    throw new Error("The company repository should be dependencies");

    const execute = async(employeeDetails: {employeeId:string,role?:string,salary?:number},companyName:string) => {
      console.log(employeeDetails);
       
    const model = await tenantRepository.getCompanySchema(companyName,"Employee")
    console.log(model);
    
    return companyRepository.addEmployee(employeeDetails,model)

  };
  return {
    execute,
  };
};
