
// import TenantSchema from './models/tenantSchema.js';
// import EmployeeSchema from './models/employeeSchema.js';
import mongoose, { Connection, Model } from 'mongoose';
import { connectDB } from '../../config/centralDB/db';
import { companySchema } from '../app/database/mongo/schemas/company/company.schema';
import { employeeSchema } from '../app/database/mongo/schemas/company/employee.schema';
import { tenantSchema } from '../app/database/mongo/schemas/tenant/tenant.schema';
import { userSchema } from '../app/database/mongo/schemas/company/user.schema';
import { channelSchema } from '../app/database/mongo/schemas/communication/channel.schema';
import { threadSchema } from '../app/database/mongo/schemas/communication/thread.schema';
import { chatSchema } from '../app/database/mongo/schemas/communication/chat.schema';

// Indicates which Schemas are used by whom

const ChildrenSchemas: Map<string, any> = new Map([['Company', companySchema],['Employee', employeeSchema],['Channel',channelSchema],['Thread',threadSchema],['Chat',chatSchema]]);
const TenantSchemas: Map<string, any> = new Map([['Tenant', tenantSchema],['User',userSchema]]);

/** Switch db on the same connection pool
 * @return new connection
 */

const switchDB = async (dbName: string, dbSchema: Map<string, any>): Promise<Connection> => {
  const mongooseInstance:any = await connectDB() 

  if (mongooseInstance.connection.readyState === 1) {
    const db = mongooseInstance.connection.useDb(dbName, { useCache: true });
    // Prevent from schema re-registration
    if (!Object.keys(db.models).length) {
      dbSchema.forEach((schema, modelName) => {
        db.model(modelName, schema);
      }); 
    }
    return db;
  }
  throw new Error('error');
};

/**
 * @return model from mongoose
 */

const getDBModel = async (db: Connection, modelName: string): Promise<Model<any>> => {
  return db.model(modelName);
};

const getAllTenants = async (): Promise<any[]> => {
  const tenantDB: Connection = await switchDB('intellectX-tenants', TenantSchemas);
  const tenantModel: Model<any> = await getDBModel(tenantDB, 'Tenant');
  const tenants: any[] = await tenantModel.find({});
  return tenants;
};

//for returns a new schema for tenants 
const initTennants = async (): Promise<mongoose.Model<any, {}, {}, {}, any, any>> => {
    const tenantDB = await switchDB('AppTenants', TenantSchemas);
    const tenant = await getDBModel(tenantDB, 'Tenant');
    return tenant;
};

const initEmployees = async (): Promise<void> => {
    const customers = await getAllTenants();
    const createEmployees = customers.map(async (tenant) => {
      const companyDB = await switchDB(tenant.companyName, ChildrenSchemas);
      const employeeModel = await getDBModel(companyDB, 'Employee');
      await employeeModel.deleteMany({});
      return employeeModel.create({
        employeeId: Math.floor(Math.random() * 10000).toString(),
        name: 'John',
        companyName: tenant.companyName,
      });
    });
    const results = await Promise.all(createEmployees);
};


const listAllEmployees = async (): Promise<any[][]> => {
    const customers = await getAllTenants();
    const mapCustomers = customers.map(async (tenant) => {
      const companyDB = await switchDB(tenant.companyName, ChildrenSchemas);
      const employeeModel = await getDBModel(companyDB, 'Employee');
      return employeeModel.find({});
    });
    const results = await Promise.all(mapCustomers);
    return results;
};

export { switchDB, initEmployees, initTennants, listAllEmployees, TenantSchemas,ChildrenSchemas, getDBModel };