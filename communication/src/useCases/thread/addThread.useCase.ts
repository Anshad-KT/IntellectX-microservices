import mongoose from "mongoose";
import { EmployeeAttrs } from "../../libs/app/database/mongo/schemas/company/employee.schema";
import { Channel } from "../../libs/entities/Channel";

import { DepenteniciesData } from "../../libs/entities/interfaces";

export const addThread_UseCase = (dependencies: DepenteniciesData) => {
  const {
    repository: { threadRepository, tenantRepository,channelRepository },
  } = dependencies;

  if (!threadRepository)
    throw new Error("The company repository should be dependencies");
    const execute = async (threadName: string, channelName:any, companyName: string) => {

      const model = await tenantRepository.getCompanySchema(companyName, "Thread");
        const threadInstance = {
        threadName,
        chat:[]
      }; console.log(model);
      console.log(channelName[0].channelName,"lkk",channelName);
      
    
  //    const insertThread = await channelRepository.addThread(insertThread._id,channelModel,threadInstance)
      // console.log("console.log",insertThread._id);
      
      return threadRepository.addThread(threadInstance, model)
  };
  return {
    execute,
  };
};
