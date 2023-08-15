import addTenantController from "./addTenant.controller";

export = (dependencies: any) => {
  return {
    addTenantController: addTenantController(dependencies),
  };
};
 