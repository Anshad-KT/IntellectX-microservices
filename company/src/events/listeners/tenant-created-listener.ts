// import { Subject } from "@intellectx/build";
import { Message } from "node-nats-streaming";
import dependencies from "../../config/depentencies";
import { addEmployee_UseCase, addTenant_UseCase, company_SignUp_UseCase } from "../../useCases";
import { Listener } from "../../libs/utils/base-listener";
import { tenantRepository } from "../../libs/app/repository/mongo";
import mongoose from "mongoose";
export declare enum Subject {
  ProductCreated = "product:created",
  UserCreated = "user:created",
  UserUpdated = "user:updated",
  ProductDeleted = "product:deleted",
  CartAdded = "cart:added",
  CartDeleted = "cart:deleted",
  TenantCreated = "tenant:created"
}

export interface TenantCreatedEvent {
  subject: Subject.TenantCreated;
  data: {
    id: string,
    companyName: string
    companyEmail: string
    budget: number
    superUsers: any
    employee:string
  };
}

export class TenantCreatedListener extends Listener<TenantCreatedEvent>{
  
  async onMessage(data: TenantCreatedEvent["data"], msg: Message) {
    const { id, companyName, companyEmail, budget, superUsers,employee } = data;
    try { 
  
      
      await addTenant_UseCase(dependencies).execute({ tenantName: companyName })
      await company_SignUp_UseCase(dependencies).execute({ id, companyName, companyEmail, budget, superUsers }, companyName)
      await addEmployee_UseCase(dependencies).execute({id:employee},companyName)

      msg.ack();
      console.log("acked ");
    } catch (error) {
      console.log(error); 
    } 
  } 
  subject: any = "tenant:created"
  queueGroup: string = 'company-tenant-service';
}
