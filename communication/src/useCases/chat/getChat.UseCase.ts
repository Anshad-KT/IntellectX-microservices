import mongoose from "mongoose";
import { EmployeeAttrs } from "../../libs/app/database/mongo/schemas/company/employee.schema";
import { Channel } from "../../libs/entities/Channel";

import { DepenteniciesData } from "../../libs/entities/interfaces";

export const getChat_UseCase = (dependencies: DepenteniciesData) => {
  const {
    repository: { chatRepository, tenantRepository },
  } = dependencies;

  if (!chatRepository)
    throw new Error("The company repository should be dependencies");
    const execute = async (threadName:string,companyName:string) => {

      const ThreadModel = await tenantRepository.getCompanySchema(companyName, "Thread");
        
      const UserModel = await tenantRepository.getCompanySchema(companyName, "User");
      
      return chatRepository.getChat(ThreadModel,threadName,UserModel)
  };
  return {
    execute,
  };
};
