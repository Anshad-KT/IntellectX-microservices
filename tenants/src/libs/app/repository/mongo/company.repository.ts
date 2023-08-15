import mongoose, { ObjectId } from "mongoose";
import { schemas } from "../../database/mongo";
import { Password } from "../../../utils/password";

// const { Company } = schemas;

export = {
  signUp: async (company: any,CompanySchema:any) => {
    const existingCompany:any = await CompanySchema.findOne({ companyEmail: company.email });
    if(!existingCompany){
     const mongooseObject = CompanySchema.build(company);
     await mongooseObject.save();
     return mongooseObject
    }
    return null
  },
  getCompany: async (company: any,CompanySchema:any) => {
    const mongooseObject = await CompanySchema.findById(company._id)
    return mongooseObject;
  },
  getUser: async (user: any,CompanyUserSchema:any) => {
    const userList = await CompanyUserSchema.find({ email: user.email });
    return userList;
  },
  addSuperUser: async (companyId: string,id:string,CompanySchema:any) => {
    const mongooseObject = await CompanySchema.findById(companyId);
    mongooseObject?.superUsers?.push(new mongoose.Types.ObjectId(id))
    return mongooseObject;
  },
  removeSuperUser: async (companyId: string,id:string,CompanySchema:any) => {
    const mongooseObject = await CompanySchema.findById(companyId);
    if(!mongooseObject){
      return null
    }
    mongooseObject.superUsers = mongooseObject.superUsers.filter((userId:any) => userId.toString() !== id);
    // Save the updated company details
    await mongooseObject.save();
    return mongooseObject;
  },
  addEmployee: async (companyId: string,employee:any,CompanySchema:any) => {
    const mongooseObject = await CompanySchema.findById(companyId);
    mongooseObject?.employees?.push(employee)
    return mongooseObject;
  },
  removeEmployee: async (companyId: string,id:string,CompanySchema:any) => {
    const mongooseObject = await CompanySchema.findById(companyId);
    if(!mongooseObject){
      return null
    }
    mongooseObject.employees = mongooseObject.employees.filter((userId:any)=>userId.toString()!==id)
    await mongooseObject.save();
    return mongooseObject;
  },
  editCompany: async ({companyName,companyEmail,companyDescription,superUsers,employees,_id}:any,CompanySchema:any) => {
    const mongooseObject = await CompanySchema.findById(_id)
    if (!mongooseObject) {
      return null;
    }
    // Update the company details based on the input
    mongooseObject.companyName = companyName;
    mongooseObject.companyEmail = companyEmail;
    mongooseObject.companyDescription = companyDescription;
    mongooseObject.superUsers = superUsers;
    mongooseObject.employees = employees;

    // Save the updated company details
    await mongooseObject.save();
    return mongooseObject
  }, 
};
