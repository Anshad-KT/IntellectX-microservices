
import addEmployeeController from "./addEmployee.controller";
import addSuperUser from "./addSuperUser.controller";
// import editCompany from "./editCompany.controller";
import removeEmployee from "./removeEmployee";
import removeSuperUser from "./removeSuperUser.controller";

export = (dependencies: any) => {
  return {

    addEmployeeController: addEmployeeController(dependencies),
    addSuperUser: addSuperUser(dependencies),
    removeEmployee: removeEmployee(dependencies),
    removeSuperUser: removeSuperUser(dependencies)

  };
};
