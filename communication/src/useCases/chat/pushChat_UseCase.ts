import mongoose from "mongoose";
import { EmployeeAttrs } from "../../libs/app/database/mongo/schemas/company/employee.schema";
import { Channel } from "../../libs/entities/Channel";

import { DepenteniciesData } from "../../libs/entities/interfaces";

export const pushChat_UseCase = (dependencies: DepenteniciesData) => {
  const {
    repository: { threadRepository, tenantRepository },
  } = dependencies;

  if (!threadRepository)
    throw new Error("The company repository should be dependencies");
    const execute = async (chatId: mongoose.Types.ObjectId, threadName:any, companyName: string) => {

      console.log("pushChat",chatId,threadName);
      
      const model = await tenantRepository.getCompanySchema(companyName, "Thread");
      
      console.log("console.logs",chatId,threadName,companyName);
      
      return threadRepository.addChat(chatId,model,threadName)
  };
  return {
    execute,
  };
};
