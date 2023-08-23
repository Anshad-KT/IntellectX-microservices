import mongoose from "mongoose";
import { EmployeeAttrs } from "../../database/mongo/schemas/company/employee.schema";
import { Channel } from "../../../entities/Channel";
import { ThreadData } from "../../../entities/Thread";
import { chatData } from "../../../entities/Chat";


export = {
    addChat: async (chat: {
        from: mongoose.Types.ObjectId;
        fileType: string;
        content: string;
    }, ChatSchema: any,UserSchema:any) => {
        const newChat = new ChatSchema(chat);
        const mongooseObject = await newChat.save();

      
        const senderDetails = await UserSchema.aggregate([
          { $match: { id: chat.from.toString() } },
          {
            $project: {
              _id: 1,
              username: 1,
              email: 1,
              // Include other fields you need in the result
              // ...
            } 
          },
        ]);
      
        const chatWithSenderDetails = {
          ...mongooseObject.toObject(),
          from: senderDetails[0], // Assuming only one result is returned
        };
    
      
        return chatWithSenderDetails;
      },   
    getChat: async (ThreadSchema: any, threadName: string,UserSchema:any) => {
        try {
            const thread = await ThreadSchema.findById(threadName)

            if (!thread) {
                throw new Error('Thread not found');
             }

            if (thread.chat && thread.chat.length > 0) {
                const populatedThread = await ThreadSchema.findById(thread._id)
                .populate({
                    path: 'chat',
                    model: 'Chat',
                    options: { sort: { createdAt: 1 } },
                })
                .exec();
            
            // Map through the populated chats and perform the population dynamically
            const populatedChatsWithSender = await Promise.all(populatedThread.chat.map(async (item:any) => {
          
                
                const senderDetails = await UserSchema.aggregate([
                    { $match: { id: item.from.toString() } },
                    {
                        $project: {
                            _id: 1,
                            username: 1,
                            email: 1,
                            // Include other fields you need in the result
                            // ...
                        }
                    },
                ]);
            
                return {
                    ...item.toObject(),
                    from: senderDetails[0], // Assuming senderDetails is an array with a single result
                };
            }));
            
            const plainThread = populatedThread.toObject(); // Convert to plain object
            plainThread.chat = populatedChatsWithSender; // Assign the new value
            
            return plainThread
            }
           
        
    
            return thread;
    } catch(error) {
        throw error;
    }
}
    
}
