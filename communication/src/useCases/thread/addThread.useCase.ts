import mongoose from "mongoose";
import { EmployeeAttrs } from "../../libs/app/database/mongo/schemas/company/employee.schema";
import { Channel } from "../../libs/entities/Channel";

import { DepenteniciesData } from "../../libs/entities/interfaces";

export const addThread_UseCase = (dependencies: DepenteniciesData) => {
  const {
    repository: { threadRepository, tenantRepository },
  } = dependencies;

  if (!threadRepository)
    throw new Error("The company repository should be dependencies");
    const execute = async (threadName: string, companyName: string) => {

      const model = await tenantRepository.getCompanySchema(companyName, "Channel");
    
    
 

      const dummyChannelData = {
        threadName: new mongoose.Types.ObjectId(threadName),
        chat:[]
      }; console.log(model);
      console.log(dummyChannelData,"lkk");
      

    return threadRepository.addThread(dummyChannelData, model)
  };
  return {
    execute,
  };
};
