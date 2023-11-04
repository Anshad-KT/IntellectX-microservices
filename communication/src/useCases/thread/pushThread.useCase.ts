import mongoose from "mongoose";
import { EmployeeAttrs } from "../../libs/app/database/mongo/schemas/company/employee.schema";
import { Channel } from "../../libs/entities/Channel";

import { DepenteniciesData } from "../../libs/entities/interfaces";

export const pushThread_UseCase = (dependencies: DepenteniciesData) => {
  const {
    repository: { threadRepository, tenantRepository,channelRepository },
  } = dependencies;

  if (!threadRepository)
    throw new Error("The company repository should be dependencies");
    const execute = async (threadId: mongoose.Types.ObjectId, channelName:any, companyName: string) => {

    
      
      const model = await tenantRepository.getCompanySchema(companyName, "Channel");
      
   
      
      return channelRepository.addThread(threadId,model,channelName.channelName)
  };
  return {
    execute,
  };
};
