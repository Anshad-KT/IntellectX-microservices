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
  getUser: async (id: any,CompanySchema:any, ThreadSchema:any) => {
    const userList = await CompanySchema.findOne({ id });
    const savedThreads = userList.savedThreads
    const foundThreads = await Promise.all(
      savedThreads.map(async (savedThread:any) => {
        const thread = await ThreadSchema.findById(savedThread.id);

        if (thread) {
          return thread;
        } else {
          console.log(`Thread not found for savedThread ID: ${savedThread.id}`);
          return null;
        }
      })
    );

    console.log('Found Threads:', foundThreads);

    // You can return the user along with the found threads
    return {
      userList,
      foundThreads,
    };
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
   saveThread : async (
    threadId: mongoose.Types.ObjectId,
    UserSchema: any,
    id: string // Assuming email is a string
  ) => {
    try {
      // Find the user by email
      const existingUser = await UserSchema.findOne({ id });
    
      if (existingUser) {
        // Create a new savedThread object
        const savedThread = {
          id: threadId,
        };
  
        // Push the savedThread into the savedThreads array
        existingUser.savedThreads.push(savedThread);
  
        // Save the user with the updated savedThreads array
        await existingUser.save();
  
        // You can return the updated user if needed
        return existingUser;
      } else {
        // User not found, you can return false or handle the error as needed
        return false;
      }
    } catch (error) {
      // Handle any errors that occur during the process
      console.error("Error saving thread:", error);
      throw error; // You can choose to throw the error or handle it differently
    }
  }
};
