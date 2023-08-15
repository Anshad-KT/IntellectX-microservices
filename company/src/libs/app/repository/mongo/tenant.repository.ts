import mongoose, { Connection, Model } from "mongoose";
import { schemas } from "../../database/mongo";
import { TenantSchemas,ChildrenSchemas, switchDB } from "../../../utils/getAllTenants";
import { getDBModel } from "../../../utils/getAllTenants";
// import { Tenant } from "../../database/mongo/schemas/tenant.schema";


export = {

    getAllTenants: async (): Promise<any[]> => {
        const tenantDB: Connection = await switchDB('intellectX-tenants', TenantSchemas);
        const tenantModel: Model<any> = await getDBModel(tenantDB, 'Tenant');
        const tenants: any[] = await tenantModel.find({});
        return tenants;
    },
    
    initTenants : async (): Promise<mongoose.Model<any, {}, {}, {}, any, any>> => {
        const tenantDB = await switchDB('intellectX-tenants', TenantSchemas);
        const tenant = await getDBModel(tenantDB, 'Tenant');
        return tenant;
    },

    getCompanySchema : async (companyName: any,modelName:string): Promise<any> => {
      if(modelName=="Tenant"||modelName=="User"){
       
        
        const tenantDB: Connection = await switchDB('intellectX-tenants', TenantSchemas);
       
        const tenantModel: Model<any> = await getDBModel(tenantDB, modelName);
        return tenantModel
      }
     
      
        const companyDB: Connection = await switchDB(companyName, ChildrenSchemas);
          
          const companyModel: Model<any> = await getDBModel(companyDB, modelName);
          return companyModel;
      
    },

    signUp: async (company: any, companySchema: any) => {
      const existingCompany: any = await companySchema.findOne({ tenantName: company });
    
      if (!existingCompany) {
        const companyDocument = [
          {
            tenantName: company,
          },
        ];
    
        const mongooseObject = await companySchema.insertMany(companyDocument);
        return mongooseObject;
      }
    
      return null;
    },
      getCompany: async (company: any,companySchema:any) => {
        const mongooseObject = await companySchema.findById(company._id)
        return mongooseObject;
      },
      deleteCompany: async (company: any,companySchema:any) => {
        const mongooseObject = await companySchema.findByIdAndDelete(company._id)
        return mongooseObject;
      },
};

