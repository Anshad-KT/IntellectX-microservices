import mongoose from "mongoose";
import { EmployeeAttrs } from "../../libs/app/database/mongo/schemas/company/employee.schema";
import { Channel } from "../../libs/entities/Channel";

import { DepenteniciesData } from "../../libs/entities/interfaces";

export const unSaveThread_UseCase = (dependencies: DepenteniciesData) => {
  const {
    repository: { userRepository, tenantRepository },
  } = dependencies;

  if (!userRepository)
    throw new Error("The company repository should be dependencies");
    const execute = async (threadId: mongoose.Types.ObjectId, companyName: string, userId:string) => {

      console.log(threadId);
      
      const model = await tenantRepository.getCompanySchema("intellectX-tenants", "User");
      
      console.log("console.logs",threadId,model,userId);
      
      return userRepository.unSaveThread(threadId,model,userId)
  };
  return {
    execute,
  };
};
