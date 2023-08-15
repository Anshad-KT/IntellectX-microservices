import mongoose from "mongoose";


export interface CompanyData {
    companyName: string;
    companyEmail: string;
    companyDescription: string;
    superUsers?: mongoose.Types.ObjectId[];
    employees: {
      id: mongoose.Types.ObjectId;
      age: number;
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
    companyName: string;
    companyEmail: string;
    companyDescription: string;
    superUsers?: mongoose.Types.ObjectId[];
    employees: {
      id: mongoose.Types.ObjectId;
      age: number;
      role: string;
      salary: string;
      attendance: {
        subject: string;
        description: string;
        mode: string;
      }[];
    }[];
    budget?:number
  
    constructor({ companyName, companyEmail, companyDescription,employees,budget }: CompanyData) {
      this.companyName =companyName 
      this.companyEmail = companyEmail
      this.companyDescription =companyDescription
      this.employees = employees
      this.budget=budget
    }
  }
  