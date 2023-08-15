
import { Tenant, TenantData } from "./Tenant";
import { User, UserData } from "./User";

export interface DepenteniciesData {
  useCases: useCaseData;
  repository: repositoryData;
}

export interface useCaseData {
  addTenant_UseCase:(dependencies:DepenteniciesData)=>{ 
    execute: (companyName:string) => Promise<Tenant | null>;
  };
  signUp_UseCase:(dependencies:DepenteniciesData)=>{
    execute: ({ username, password, email }: UserData) => Promise<{id:string,username:string,email:string,version:number} | null>;
  };
  getUser_UseCase:(dependencies:DepenteniciesData)=>{
    execute: ({ username, password, email }: UserData) => Promise<any[]>
  };
  signIn_UseCase:(dependencies:DepenteniciesData)=>{
    execute: ({ password, email }: UserData) => Promise<User | null>;
  };
}

export interface repositoryData {
  tenantRepository: {
    signUp: (company: any) => Promise<any>;
    getCompany: (company: any) => Promise<any>;
    deleteCompany: (company: any) => Promise<any>;
  };
  userRepository:{
    signUp: (user: any) => Promise<any>
    getUser: (user: any) => Promise<any[]>
    signIn: (user: any) => Promise<any | boolean>
  }
}