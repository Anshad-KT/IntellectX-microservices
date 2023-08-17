import mongoose from "mongoose";
import { EmployeeAttrs } from "../../libs/app/database/mongo/schemas/company/employee.schema";
import { Channel } from "../../libs/entities/Channel";

import { DepenteniciesData } from "../../libs/entities/interfaces";

export const addChat_UseCase = (dependencies: DepenteniciesData) => {
  const {
    repository: { chatRepository, tenantRepository },
  } = dependencies;

  if (!chatRepository)
    throw new Error("The company repository should be dependencies");
    const execute = async (from:string,fileType:string,content:string,companyName:string) => {

      const model = await tenantRepository.getCompanySchema(companyName, "Chat");
        const chatInstance = {
        from:new mongoose.Types.ObjectId(from),
        fileType,
        content,
      };
       console.log(model);
 
      
      return chatRepository.addChat(chatInstance, model)
  };
  return {
    execute,
  };
};
