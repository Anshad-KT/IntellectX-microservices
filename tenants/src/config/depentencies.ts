import { tenantRepository } from "../libs/app/repository/mongo";
import { userRepository } from "../libs/app/repository/mongo";
import { repositoryData, useCaseData } from "../libs/entities/interfaces";
import { signUp_UseCase,addTenant_UseCase,getUser_UseCase,signIn_UseCase } from "../useCases";



const useCases: useCaseData = {
   addTenant_UseCase,
   signUp_UseCase,
   getUser_UseCase,
   signIn_UseCase
};

const repository: repositoryData = {
  userRepository,
  tenantRepository
};

export = {
  useCases,
  repository,
};
