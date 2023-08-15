
import { UserData, User } from "../../libs/entities";
import { DepenteniciesData } from "../../libs/entities/interfaces";

export const getChannel_UseCase = (dependencies: DepenteniciesData) => {
  const {
    repository: { channelRepository,tenantRepository },
  } = dependencies;

  if (!channelRepository)
    throw new Error("The user repository should be dependencie");

    const execute = async(id:string,companyName:string) => {
   
   
    
    const model = await tenantRepository.getCompanySchema(companyName,"Channel")
    return channelRepository.getChannel(model,id);
  };
  return {
    execute,
  };
};
 