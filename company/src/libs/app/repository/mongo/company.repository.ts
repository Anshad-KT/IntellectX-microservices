import mongoose from "mongoose";
import { EmployeeAttrs } from "../../database/mongo/schemas/company/employee.schema";


// const { Tenant } = schemas;

export = {
  signUp: async (company: any, CompanySchema: any) => {
    const existingCompany: any = await CompanySchema.findOne({ companyName: company.companyName });
  
    if (!existingCompany) {
      console.log(company, "555");
  
      const newCompany = new CompanySchema(company); // Create a new instance of the CompanySchema with the provided data
      const mongooseObject = await newCompany.save(); // Save the new company instance to the database
  console.log(mongooseObject);
  
      return mongooseObject;
    }
  
    return null;
  },
  getCompany: async (company: any,CompanySchema:any) => {
    const mongooseObject = await CompanySchema.findById(company._id)
    return mongooseObject;
  },
  getUser: async (email: any,CompanyUserSchema:any) => {
    const userList = await CompanyUserSchema.findByEmail(email);
    return userList;
  },
  addSuperUser: async (id:string,CompanySchema:any) => {
    const mongooseObject = await CompanySchema.findone();
    mongooseObject?.superUsers?.push(new mongoose.Types.ObjectId(id))
    return mongooseObject;
  },
  removeSuperUser: async (id:string,CompanySchema:any) => {
    const mongooseObject = await CompanySchema.findOne();
    if(!mongooseObject){
      return null
    }
    mongooseObject.superUsers = mongooseObject.superUsers.filter((userId:any) => userId.toString() !== id);
    // Save the updated company details
    await mongooseObject.save();
    return mongooseObject;
  },
  addEmployee: async (employeeDetails: EmployeeAttrs,CompanyEmployeeSchema:any) => {
    const mongooseObject = CompanyEmployeeSchema.build(employeeDetails);
    await mongooseObject.save()
    return mongooseObject;
  },
  removeEmployee: async (id:string,CompanySchema:any) => {
    const mongooseObject = await CompanySchema.findOne();
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
  getEmployee:async (CompanyUserSchema:any) => {
    const employees = await CompanyUserSchema.find()
    return employees;
  },
};
