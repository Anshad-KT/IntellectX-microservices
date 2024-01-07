import { tenantRepository } from "../libs/app/repository/mongo";
import { userRepository } from "../libs/app/repository/mongo";
import { DepenteniciesData, repositoryData, useCaseData } from "../libs/entities/interfaces";
import { signUp_UseCase,addTenant_UseCase,getUser_UseCase,signIn_UseCase } from "../useCases";
import { getOtp_UseCase, verification_UseCase } from "../useCases/user";



const useCases: useCaseData = {
  addTenant_UseCase,
  signUp_UseCase,
  getUser_UseCase,
  signIn_UseCase,
  getOtp_UseCase,
   verification_UseCase
};

const repository: repositoryData = {
  userRepository,
  tenantRepository
}; 

export = {
  useCases,
  repository,
};
