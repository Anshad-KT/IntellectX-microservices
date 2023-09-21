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
      // Find the user by ID
      const existingUser = await UserSchema.findOne({ id });
  
      if (!existingUser) {
        // Handle the case where the user is not found
        console.log('User not found.');
        return false;
      }
       console.log(existingUser);
       
      // Check if the threadId is already in the savedThreads array
      const isThreadAlreadySaved = existingUser.savedThreads.find((savedThread: any) => {
        const savedThreadIdAsString = savedThread.id.toString(); // Convert ObjectId to string
       
        const threadIdAsString = threadId.toString(); // Convert threadId to string
        console.log(savedThread, '   ', threadId, '  ', typeof savedThread, '  ', typeof threadId);
        return savedThreadIdAsString === threadIdAsString;
    });
    
    console.log(threadId, isThreadAlreadySaved);
    
    if (isThreadAlreadySaved) {
      // If the thread is already saved, remove it from the savedThreads array
      existingUser.savedThreads = existingUser.savedThreads.filter((savedThread: any) => savedThread.id.toString() !== threadId.toString());
    
      // Save the user with the updated savedThreads array
      await existingUser.save();
    
      console.log('Thread removed from savedThreads.', existingUser);
    
      // Return the updated user
      return existingUser;
    }
    
     else {
        // If the thread is not found in savedThreads, add it
        const savedThread = {
          id: threadId,
        };
  
        // Push the savedThread into the savedThreads array
        existingUser.savedThreads.push(savedThread);
  
        // Save the user with the updated savedThreads array
        await existingUser.save();
  
        console.log('Thread added to savedThreads.');
  
        // Return the updated user
        return existingUser;
      }
    } catch (error) {
      // Handle any errors that occur during the process
      console.error('Error saving thread:', error);
      throw error; // You can choose to throw the error or handle it differently
    }
  }
};
