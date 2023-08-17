import mongoose from "mongoose";


export interface CompanyData {
    id:string
    companyName: string;
    companyEmail: string;

    superUsers?: mongoose.Types.ObjectId[];
    employees?: mongoose.Types.ObjectId[]
    budget?:number
  }
  
  export class Company {
     id:string
    companyName: string;
    companyEmail: string;
    superUsers?: mongoose.Types.ObjectId[];
    employees?: mongoose.Types.ObjectId[]
     
    budget?:number
  
    constructor({id, companyName, companyEmail,budget }: CompanyData) {
      this.id = id
      this.companyName = companyName 
      this.companyEmail = companyEmail
 
      this.budget=budget
    }
  }
  