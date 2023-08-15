import mongoose from "mongoose";
import { schemas } from "../../database/mongo";
import { Password } from "../../../utils/password";

//const { User } = schemas;

export = {
  signUp: async (user: any, companySchema: any) => {
    const { id, username, email } = user;
  
    const newUser = new companySchema({
      id,
      username,
      email,
    });
  
    try {
      const savedUser = await newUser.save();
      return savedUser;
    } catch (error) {
      // Handle error here
      throw error;
    }
  },
  getUser: async (user: any,CompanySchema:any) => {
    const userList = await CompanySchema.find({ email: user.email });
    return userList;
  },

  signIn: async (user: any,CompanySchema:any) => {
    const existingUser: any = await CompanySchema.findOne({ email: user.email });

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
};
