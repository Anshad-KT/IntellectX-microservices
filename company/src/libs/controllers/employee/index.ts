import getEmployeeController from "./getEmployeeController";



export = (dependencies: any) => {
  return {

    getEmployeeController: getEmployeeController(dependencies),

  };
};
