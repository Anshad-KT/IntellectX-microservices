
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
    execute: (email: string) => Promise<any[]>
  };
  signIn_UseCase:(dependencies:DepenteniciesData)=>{
    execute: ({ password, email }: UserData) => Promise<User | null>;
  };
  getOtp_UseCase:(dependencies:DepenteniciesData)=>{
    execute: (email: string) => Promise<any | null>;
  };
  verification_UseCase:(dependencies:DepenteniciesData)=>{
    execute: (id: string,sessionValue:any) => boolean;
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
    getUser: (email: string) => Promise<any[]>
    signIn: (user: any) => Promise<any | boolean>
  }
}