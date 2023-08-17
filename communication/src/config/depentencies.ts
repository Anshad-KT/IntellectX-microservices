import { channelRepository, companyRepository, tenantRepository } from "../libs/app/repository/mongo";
import { DepenteniciesData, repositoryData, useCaseData } from "../libs/entities/interfaces";
import {  addSuperUser_UseCase,getCompany_UseCase,removeSuperUser_UseCase, removeEmployee_UseCase, addEmployee_UseCase,getEmployeeDetails_UseCase, addTenant_UseCase, getUser_UseCase, signUp_UseCase, signIn_UseCase,company_SignUp_UseCase, getChannel_UseCase, addChat_UseCase, pushChat_UseCase } from "../useCases";
import userRepository from "../libs/app/repository/mongo/user.repository";
import { Tenant } from "../libs/entities/Tenant";
import { addChannel_UseCase } from "../useCases/channel/addChannel.useCase";
import { Channel } from "../libs/entities/Channel";
import { addThread_UseCase } from "../useCases/thread/addThread.useCase";
import threadRepository from "../libs/app/repository/mongo/thread.repository";
import { Types } from "mongoose";
import { pushThread_UseCase } from "../useCases/thread";
import chatRepository from "../libs/app/repository/mongo/chat.repository";
import { getChat_UseCase } from "../useCases/chat";



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
  getChannel_UseCase,
  addThread_UseCase,
  pushThread_UseCase,
  addChat_UseCase,
  pushChat_UseCase,
  getChat_UseCase
};

const repository: repositoryData = {
  companyRepository,
  tenantRepository,
  userRepository,
  channelRepository,
  threadRepository,
  chatRepository
};

export = {
  useCases,
  repository,
};
 