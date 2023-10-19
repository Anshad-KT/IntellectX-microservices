
import addEmployeeController from "./addEmployee.controller";
import addSuperUser from "./addSuperUser.controller";
import getSuperUser from "./getSuperUserDetails.controller";
import removeEmployee from "./removeEmployee";
import removeSuperUser from "./removeSuperUser.controller";

export = (dependencies: any) => {
  return {
    addEmployeeController: addEmployeeController(dependencies),
    addSuperUserController: addSuperUser(dependencies),
    removeEmployeeController: removeEmployee(dependencies),
    removeSuperUserController: removeSuperUser(dependencies),
    getSuperUserController: getSuperUser(dependencies)
  };
};
