import mongoose, { Model } from "mongoose";
import { Company } from "./Company";
import { Tenant } from "./Tenant";
import { CompanyDoc } from "../app/database/mongo/schemas/company/company.schema";
import { EmployeeAttrs } from "../app/database/mongo/schemas/company/employee.schema";
import { User, UserData } from "./User";
import { Channel } from "./Channel";

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
    execute: ({ username, email }: UserData) => Promise<any[]>
  };
  signIn_UseCase:(dependencies:DepenteniciesData)=>{
    execute: ({ username, email }: UserData) => Promise<User | null>;
  };
  addTenant_UseCase:(dependencies:DepenteniciesData)=>{ 
    execute: (companyName:string) => Promise<Tenant | null>;
  };
  company_SignUp_UseCase:(dependencies:DepenteniciesData)=>{ 
    execute: ({id,companyName,companyEmail,budget,superUsers,employees}:{id:string,companyName:string,companyEmail:string,budget:number,superUsers:string,employees:string},companyTitle:string) => Promise<Tenant | null>;
  };
  addChannel_UseCase:(dependencies:DepenteniciesData)=>{ 
    execute: (channel:Channel,companyName:string) => Promise<Channel | null>;
  };
  getEmployee_UseCase:(dependencies:DepenteniciesData)=>{ 
    execute: (companyName:string) => Promise<EmployeeAttrs[] | null>;
  };
}

export interface repositoryData {
  companyRepository: {
    getEmployee:(companySchema:any) => Promise<EmployeeAttrs[] | null>
    signUp:(
      company: Company,
      CompanySchema: any
    ) => Promise<any | null>;
    getCompany: (company: any, CompanySchema: any) => Promise<Company | null>;
    getUser: (user: any, CompanyUserSchema: any) => Promise<any[]>;
    addSuperUser: ( id: string, CompanySchema: any) => Promise<Company | null>;
    removeSuperUser: ( id: string, CompanySchema: any) => Promise<Company | null>;
    addEmployee: (
      employeeDetails: {id:string,role?:string,salary?:number},
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
    getUser: (user: any,CompanySchema: any) => Promise<any[]>
    signIn: (user: any,CompanySchema: any) => Promise<any | boolean>
  }
  channelRepository:{
    addChannel:(channel:Channel,channelSchema:any) => Promise<any>
  }
}
