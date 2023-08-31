import generateLinkController from "./generateLink.controller";
import getEmployeeController from "./getEmployeeController";
import verifygeneratedLinkController from "./verifygeneratedLink.controller";


export = (dependencies: any) => {
  return {

    getEmployeeController: getEmployeeController(dependencies),
    generateLinkController:generateLinkController(dependencies),
    verifygeneratedLinkController:verifygeneratedLinkController(dependencies)
  };
};
