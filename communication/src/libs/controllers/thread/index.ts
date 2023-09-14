import addThreadController from "./addThread.Controller";
import saveThreadController from "./saveThreadController"

export = (dependencies: any) => {
  return {
    addThreadController: addThreadController(dependencies),
    saveThreadController: saveThreadController(dependencies)
  };
};
 