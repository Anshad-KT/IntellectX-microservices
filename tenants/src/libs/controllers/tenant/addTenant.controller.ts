import { Request, Response, NextFunction } from "express";
import { BadRequestError, NotAuthorizedError } from "@intellectx/build";
import generateToken from "../../utils/jsonwebtoken";
import { DepenteniciesData } from "../../entities/interfaces";
import { TenantRegisteredPublisher } from "../../../events/publishers/tenant-registered-publisher";
import { natsWrapper } from "../../../../nats-wrapper";

export = (dependencies: DepenteniciesData): any => {
  const {
    useCases: { addTenant_UseCase },
  } = dependencies;

  const addTenant = async (req: Request, res: Response, next: NextFunction) => {
    try {

      const { companyName,companyEmail,budget,superUsers,employee } = req.body;
console.log(req.body);

      if (!companyEmail) throw new BadRequestError("Please provide a company email");
   
      const addedCompanyName:any = await addTenant_UseCase(dependencies).execute(companyName);

      if (!addedCompanyName) throw new BadRequestError("Invalid Credentials");
      await new TenantRegisteredPublisher(natsWrapper.client).publish({
        id: addedCompanyName._id,
        companyName: addedCompanyName.tenantName,
        companyEmail,
        budget,
        superUsers,
        employee
      })
      res.json(addedCompanyName);  

    } catch (error: any) {
      throw new Error(error);   
    }
  };
  return addTenant;
};
 