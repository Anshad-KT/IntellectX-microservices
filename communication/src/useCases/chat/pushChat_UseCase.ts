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
      const model = await tenantRepository.getCompanySchema(companyName, "Thread");
      return threadRepository.addChat(chatId,model,threadName)
  };
  return {
    execute,
  };
};
