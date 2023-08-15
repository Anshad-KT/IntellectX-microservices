import mongoose from "mongoose";


export interface CompanyData {
    id:string
    companyName: string;
    companyEmail: string;

    superUsers?: mongoose.Types.ObjectId[];
    employees?: {
      id: mongoose.Types.ObjectId;
      role: string;
      salary: string;
      attendance: {
        subject: string;
        description: string;
        mode: string;
      }[];
    }[];
    budget?:number
  }
  
  export class Company {
     id:string
    companyName: string;
    companyEmail: string;
    superUsers?: mongoose.Types.ObjectId[];
    employees?: {
      id: mongoose.Types.ObjectId;
      ref:'User',
      role: string;
      salary: string;
      attendance: {
        subject: string;
        description: string;
        mode: string;
      }[];
    }[];
    budget?:number
  
    constructor({id, companyName, companyEmail,budget }: CompanyData) {
      this.id = id
      this.companyName = companyName 
      this.companyEmail = companyEmail
 
      this.budget=budget
    }
  }
  