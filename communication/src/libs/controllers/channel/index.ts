import addChannelController from "./addChannel.Controller";
import getChannelController from './getChannel.controller'

export = (dependencies: any) => {
  return {
    addChannelController: addChannelController(dependencies),
    getChannelController: getChannelController(dependencies)
  };
};
 