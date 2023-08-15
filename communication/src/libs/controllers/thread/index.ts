import addThreadController from "./addThread.Controller";


export = (dependencies: any) => {
  return {
    addThreadController: addThreadController(dependencies),
  };
};
 