import mongoose from "mongoose";
import { EmployeeAttrs } from "../../database/mongo/schemas/company/employee.schema";
import { Password } from "../../../utils/password";


// const { Tenant } = schemas;

export = {
  signUp: async (company: any, CompanySchema: any) => {
    const existingCompany: any = await CompanySchema.findOne({ companyName: company.companyName });
  
    if (!existingCompany) {
   
  
      const newCompany = new CompanySchema(company); // Create a new instance of the CompanySchema with the provided data
      const mongooseObject = await newCompany.save(); // Save the new company instance to the database
  
  
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
  addEmployee: async (employeeDetails: EmployeeAttrs, CompanyEmployeeSchema: any) => {
 
    
    const newEmployee = new CompanyEmployeeSchema(employeeDetails); // Create a new instance of the CompanyEmployeeSchema with the provided data
   try {
    const mongooseObject = await newEmployee.save();
    return mongooseObject;
   } catch (error) {
    console.log(`error while inserting ${employeeDetails} to ${CompanyEmployeeSchema}`,error);
    
   } // Save the new employee instance to the database
   
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
  getEmployee:async (CompanyUserSchema:any,UserSchema:any) => {
    const employees = await CompanyUserSchema.find();
    
    const employeeDetailsPromises = employees.map(async (employee:any) => {
        const userDetails = await UserSchema.aggregate([
            { $match: { id: employee.id} },
            {
                $project: {
                    _id: 1,
                    username: 1,
                    email: 1,
                    // Include other fields you need in the result
                    // ...
                }
            },
        ]);
        return {
            ...employee.toObject(),
            userDetails: userDetails[0], // Assuming only one result is returned
        };
    });
    
    const employeesWithDetails = await Promise.all(employeeDetailsPromises);
    
    console.log(employeesWithDetails);
    
    return employeesWithDetails;
  },
  generateLink: async (  companyName:string,CompanySchema: any) => {
    const hashedValue = await Password.toHash(companyName);
  
    if (CompanySchema) {
      const mongooseObject = await CompanySchema.findOne();
        if(!mongooseObject){
        return null
      }
  
        mongooseObject.inviteLinks.push({link:`intellectx.${companyName}.invite/${hashedValue}`});
        await mongooseObject.save(); // Save the updated document
        return {link:`intellectx.${companyName}.invite/${hashedValue}`};
      }
    },
    verifyGeneratedLink: async (companyName: string,CompanySchema: any) => {
      try {
        if (CompanySchema) {
          const mongooseObject = await CompanySchema.findOne();
    
          if (!mongooseObject) {
            return false;
          }
  //fix the mistakes that you already created  
          const hashedLinkExists = mongooseObject.inviteLinks.some(async (linkObj: any) => {
            const hashedLinkValue = linkObj.link.split('/').pop(); 
            return await Password.compare(hashedLinkValue, companyName);
            
          });
          if(!hashedLinkExists){
             return false
          }
          return companyName;
        }
    
        return false;
      } catch (error) {
        console.error('Error checking hashed value:', error);
        return false;
      }
    }
};
