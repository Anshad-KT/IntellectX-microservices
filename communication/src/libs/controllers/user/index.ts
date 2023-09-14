import getUserController from "./currentUser.Controller";


export = (dependencies: any) => {
  return {
    getUserController: getUserController(dependencies),
  };
};
 