import mongoose, { ObjectId } from "mongoose";
import { schemas } from "../../database/mongo";

const { Tenant } = schemas;

export = {
  signUp: async (company: any) => {
    console.log(company);
    
    const existingCompany:any = await Tenant.findOne({ tenantName: company });
    if(!existingCompany){
     const mongooseObject = Tenant.build({tenantName:company});
     await mongooseObject.save();
     console.log(mongooseObject,"rrr");
     
     return mongooseObject
    }
    return null
  },
  getCompany: async (company: any) => {
    const mongooseObject = await Tenant.findById(company._id)
    return mongooseObject;
  },
  deleteCompany: async (company: any) => {
    const mongooseObject = await Tenant.findByIdAndDelete(company._id)
    return mongooseObject;
  },
};
