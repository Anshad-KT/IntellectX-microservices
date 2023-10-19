import { companyRepository, tenantRepository } from "../libs/app/repository/mongo";
import { DepenteniciesData, repositoryData, useCaseData } from "../libs/entities/interfaces";
import {  addSuperUser_UseCase,getCompany_UseCase,removeSuperUser_UseCase, removeEmployee_UseCase, addEmployee_UseCase,getEmployeeDetails_UseCase, addTenant_UseCase, getUser_UseCase, signUp_UseCase, signIn_UseCase,company_SignUp_UseCase, getEmployee_UseCase, generateLink_UseCase, getSuperUserDetails_UseCase } from "../useCases";
import userRepository from "../libs/app/repository/mongo/user.repository";
import { Tenant } from "../libs/entities/Tenant";
import { addChannel_UseCase } from "../useCases/channel/addChannel.useCase";
import channelRepository from "../libs/app/repository/mongo/channel.repository";
import { verifyGeneratedLink_UseCase } from "../useCases/user/verifyGeneratedLink.useCase";



const useCases: useCaseData = {
  addSuperUser_UseCase,
  removeSuperUser_UseCase,
  getCompany_UseCase,
  addEmployee_UseCase,
  removeEmployee_UseCase,
  getEmployeeDetails_UseCase,
  addTenant_UseCase,
  signUp_UseCase,
  getUser_UseCase,
  signIn_UseCase,
  company_SignUp_UseCase,
  addChannel_UseCase,
  getEmployee_UseCase,
  generateLink_UseCase,
  verifyGeneratedLink_UseCase,
  getSuperUserDetails_UseCase
};

const repository: repositoryData = {
  companyRepository,
  tenantRepository,
  userRepository,
  channelRepository
};

export = {
  useCases,
  repository,
};
