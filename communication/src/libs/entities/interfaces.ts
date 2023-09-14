import mongoose, { Model } from "mongoose";
import { Company } from "./Company";
import { Tenant } from "./Tenant";
import { CompanyDoc } from "../app/database/mongo/schemas/company/company.schema";
import { EmployeeAttrs } from "../app/database/mongo/schemas/company/employee.schema";
import { User, UserData } from "./User";
import { Channel } from "./Channel";
import { Thread, ThreadData } from "./Thread";
import { chatData } from "./Chat";

export interface DepenteniciesData {
  useCases: useCaseData;
  repository: repositoryData;
}

export interface useCaseData {

  removeSuperUser_UseCase: (dependencies:DepenteniciesData)=>{
    execute: (companyId: string, id: any,companySchema:any) => Promise<Company | null>;
  };
  getCompany_UseCase: (dependencies:DepenteniciesData)=>{
    execute: (id: string,companySchema:any) => Promise<Company | null>;
  };
  addSuperUser_UseCase: (dependencies:DepenteniciesData)=>{
    execute: (id: string,companyName:string) => Promise<Company | null>;
  };
  addEmployee_UseCase:(dependencies:DepenteniciesData)=>{
    execute: (employeeDetails:any,companyName:any) => Promise<Company | null>;
  };
  removeEmployee_UseCase:(dependencies:DepenteniciesData)=>{
    execute: (id: string,companyName:string) => Promise<Company | null>;
  };
  getEmployeeDetails_UseCase:(dependencies:DepenteniciesData)=>{
    execute: (id:string,companyName:string) => Promise<any | null>;
  };
  signUp_UseCase:(dependencies:DepenteniciesData)=>{
    execute: ({ username, email }: UserData) => Promise<any | null>;
  };
  getUser_UseCase:(dependencies:DepenteniciesData)=>{
    execute: (id: string,companyName:string) => Promise<any[]>
  };
  signIn_UseCase:(dependencies:DepenteniciesData)=>{
    execute: ({ username, email }: UserData) => Promise<User | null>;
  }; 
  addTenant_UseCase:(dependencies:DepenteniciesData)=>{ 
    execute: (companyName:string) => Promise<Tenant | null>;
  };
  company_SignUp_UseCase:(dependencies:DepenteniciesData)=>{ 
    execute: ({id,companyName,companyEmail,budget,superUsers}:{id:string,companyName:string,companyEmail:string,budget:number,superUsers:string},companyTitle:string) => Promise<Tenant | null>;
  };
  addChannel_UseCase:(dependencies:DepenteniciesData)=>{ 
    execute: (channel:{
      creator: string;
      channelName:string
      superUsers: string[];
      previlagedUsers: string[];
      threads: string[];
    },companyName:string) => Promise<Channel | null>;
  };
  getChannel_UseCase:(dependencies:DepenteniciesData)=>{ 
    execute: (id:string,companyName:string) => Promise<any | null>;
  };
  addThread_UseCase:(dependencies:DepenteniciesData)=>{ 
    execute: (threadName: string, channelName: string, companyName: string) => Promise<any | null>;
  };
  pushThread_UseCase:(dependencies:DepenteniciesData)=>{ 
    execute: (threadId: mongoose.Types.ObjectId, channelName:any, companyName: string) => Promise<any | null>;
  };
  addChat_UseCase:(dependencies:DepenteniciesData)=>{ 
    execute: (from:string,fileType:string,content:string,companyName:string) => Promise<any | null>;
  };
  pushChat_UseCase:(dependencies:DepenteniciesData)=>{ 
    execute: (chatId: mongoose.Types.ObjectId, threadName:any, companyName: string) => Promise<any | null>;
  };
  getChat_UseCase:(dependencies:DepenteniciesData)=>{ 
    execute: (threadName:string,companyName:string) => Promise<any | null>;
  };
  saveThread_UseCase:(dependencies:DepenteniciesData)=>{ 
    execute: (threadId:mongoose.Types.ObjectId,companyName:string,userId:string) => Promise<any | null>;
  };
}

export interface repositoryData {
  companyRepository: {
    signUp:(
      company: Company,
      CompanySchema: any
    ) => Promise<any | null>;
    getCompany: (company: any, CompanySchema: any) => Promise<Company | null>;
    getUser: (user: any, CompanyUserSchema: any) => Promise<any[]>;
    addSuperUser: ( id: string, CompanySchema: any) => Promise<Company | null>;
    removeSuperUser: ( id: string, CompanySchema: any) => Promise<Company | null>;
    addEmployee: (
      employeeDetails: any,
      CompanyEmployeeSchema: any
    ) => Promise<any>;
    removeEmployee: (id: string, CompanySchema: any) => Promise<Company | null>;
    editCompany: (company: {
      companyName: string;
      companyEmail: string;
    
      superUsers: mongoose.Types.ObjectId[];
      employees: any[];
      _id: string;
    }, CompanySchema: any) => Promise<Company | null>;
  };
  tenantRepository: {
    getAllTenants: () => Promise<any[]>;
    initTenants: () => Promise<any>;
    getCompanySchema: (
      companyName: string,
      modelName: string
    ) => Promise<Model<CompanyDoc> | null>;
    signUp: (company: any, CompanySchema: any) => Promise<any>;
    getCompany: (company: any, CompanySchema: any) => Promise<any>;
    deleteCompany: (company: any, CompanySchema: any) => Promise<any>;
  };
  userRepository:{
    signUp: (user: any,CompanySchema: any) => Promise<any>
    getUser: (user: any,CompanySchema: any,ThreadSchema:any) => Promise<any[]>
    signIn: (user: any,CompanySchema: any) => Promise<any | boolean>
    saveThread: (threadId:mongoose.Types.ObjectId,UserSchema:any,userId:string) => Promise<any | null>
  }
  channelRepository:{
    addChannel:(channel:{
      creator: mongoose.Types.ObjectId;
      channelName:string
      superUsers: mongoose.Types.ObjectId[];
      previlagedUsers: mongoose.Types.ObjectId[];
      threads: mongoose.Types.ObjectId[];
    },channelSchema:any) => Promise<any>
    getChannel: (ChannelSchema: any, id: string) => Promise<PromiseSettledResult<any>[]>;
    addThread:(channelName: mongoose.Types.ObjectId, ChannelSchema: any, threadData: any) => Promise<Channel | null>

  }
  threadRepository:{
    addThread:(thread:ThreadData,companySchema:any) => Promise<ThreadData | any|null>
    addChat:(chat: mongoose.Types.ObjectId, ThreadSchema: any,threadName:string) => Promise<ThreadData | any | null>
  }
  chatRepository:{
    addChat:(chatId: {
      from: mongoose.Types.ObjectId;
      fileType: string;
      content: string;
  }, threadName:any,UserSchema:any) => Promise<chatData | any|null>
    getChat: (ThreadSchema: any, threadName: string, UserSchema:any) => Promise<any>;
  }
}
