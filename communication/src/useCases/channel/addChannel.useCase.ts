import mongoose from "mongoose";
import { EmployeeAttrs } from "../../libs/app/database/mongo/schemas/company/employee.schema";
import { Channel } from "../../libs/entities/Channel";

import { DepenteniciesData } from "../../libs/entities/interfaces";

export const addChannel_UseCase = (dependencies: DepenteniciesData) => {
  const {
    repository: { channelRepository, tenantRepository },
  } = dependencies;

  if (!channelRepository)
    throw new Error("The company repository should be dependencies");
    const execute = async (channel: {
      creator: string,
      channelName: string,
      superUsers: string[], // Array of strings
      previlagedUsers: string[], // Array of strings
      threads: string[], // Array of strings
    }, companyName: string) => {

      const model = await tenantRepository.getCompanySchema(companyName, "Channel");
    
     const g = new mongoose.Types.ObjectId(channel.creator)

     console.log(g,"lok");

      const dummyChannelData = {
        creator: new mongoose.Types.ObjectId(channel.creator),
        channelName: channel.channelName,
        superUsers: channel.superUsers.map(id => new mongoose.Types.ObjectId(id)), 
        previlagedUsers: channel.previlagedUsers.map(id => new mongoose.Types.ObjectId(id)), 
        threads: channel.threads.map(id => new mongoose.Types.ObjectId(id)), 
      }; console.log(model);
      console.log(dummyChannelData,"lkk");
      

    return channelRepository.addChannel(dummyChannelData, model)

  };
  return {
    execute,
  };
};
