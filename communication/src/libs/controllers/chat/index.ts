import getChatController from "./getChat.Controller";
import addChatController from "./addChat.Controller";

export = (dependencies: any) => {
  return {
    getChatController: getChatController(dependencies),
    addChatController: addChatController(dependencies),
  };
};
 