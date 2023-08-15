import { EmployeeAttrs } from "../../libs/app/database/mongo/schemas/company/employee.schema";
import { Channel } from "../../libs/entities/Channel";

import { DepenteniciesData } from "../../libs/entities/interfaces";

export const addChannel_UseCase = (dependencies: DepenteniciesData) => {
  const {
    repository: { channelRepository,tenantRepository },
  } = dependencies;

  if (!channelRepository)
    throw new Error("The company repository should be dependencies");

    const execute = async(channel:Channel,companyName:string) => {
    const model = await tenantRepository.getCompanySchema(companyName,"Channel")
    return channelRepository.addChannel(channel,model)

  };
  return {
    execute,
  };
};
