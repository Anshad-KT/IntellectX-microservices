import mongoose from "mongoose";
import { schemas } from "../../database/mongo";
import { Password } from "../../../utils/password";

const { User } = schemas;

export = {
  signUp: async (user: any) => {
    const mongooseObject = User.build(user);
    return await mongooseObject.save();
  },

  getUser: async (email: string): Promise<any> => {
    const userList = await User.findOne({ email });


    return userList;
  },

  signIn: async (user: any) => {
    const existingUser: any = await User.findOne({ email: user.email });

    if (existingUser) {
      const passwordsMatch = await Password.compare(
        existingUser.password,
        user.password
      );
      if (passwordsMatch) {
        return existingUser;
      } else {
        return false;
      }
    } else {
      return false;
    }
  },
  verify: async (link: string) => {
    const existingLink = await User.findOne({})
  },
  updateCurrentCompany: async (email: string,currentCompany:string) => {
    const existringUser = await User.updateOne({email},{currentCompany})
    return existringUser
  }
};
