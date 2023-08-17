import mongoose from "mongoose";
import { EmployeeAttrs } from "../../database/mongo/schemas/company/employee.schema";
import { Channel } from "../../../entities/Channel";
import { ThreadData } from "../../../entities/Thread";


export = {
    addChat:async (chatId:mongoose.Types.ObjectId, threadSchema: any, threadName: string) => {
        const existingThread = await threadSchema.findById( threadName );
      
        if (existingThread) {

            console.log(chatId);
            
          existingThread.chat.push(chatId); // Push the new thread data into the threads array
          const updatedChannel = await existingThread.save();
      
          return updatedChannel;
        } 
      
        return null; // Return null or handle the case when the channel doesn't exist
    },
    addThread: async (thread: ThreadData, ChannelSchema: any) => {
        const mongooseObject = await ChannelSchema.findOne({threadName:thread.threadName});
        if (!mongooseObject) {

            const newChannel = new ChannelSchema(thread);
            const mongooseObject = await newChannel.save();

            return mongooseObject;
        }
        return mongooseObject;
    },
    getThread: async (ChannelSchema: any, id: string) => {
        const channels = await ChannelSchema.find({
            previlagedUsers: { $in: [new mongoose.Types.ObjectId(id)] },
        }).lean(); // Use .lean() to get plain objects
        
        
        console.log(channels);
        
        if (channels[0].threads) {
            const populatedChannels = await Promise.all(channels.map(async (channel: any) => {
                const populatedChannel = await ChannelSchema.findById(channel._id) // Retrieve by ID to get Mongoose document
                    .populate({
                        path: 'threads',
                        model: 'Thread',
                    })
                    .exec();
         
                 return populatedChannel;
                
            }));
         
            return populatedChannels;
        } 
        
        return channels;
}
}
