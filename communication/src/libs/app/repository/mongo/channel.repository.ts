import mongoose from "mongoose";
import { EmployeeAttrs } from "../../database/mongo/schemas/company/employee.schema";
import { Channel } from "../../../entities/Channel";


export = {
    addChannel: async (channel: Channel, ChannelSchema: any) => {
        const mongooseObject = await ChannelSchema.findOne({ channelName: channel.channelName });
        if (!mongooseObject) {

            const newChannel = new ChannelSchema(channel);
            const mongooseObject = await newChannel.save();

            return mongooseObject;
        }
        return mongooseObject;
    },
    getChannel: async (ChannelSchema: any, id: string) => {
        const channels = await ChannelSchema.find({
            previlagedUsers: { $in: [new mongoose.Types.ObjectId(id)] },
        }).lean(); // Use .lean() to get plain objects
        
        console.log(channels);
        
        if(channels.length==0){
            const channels = await ChannelSchema.find().sort({_id:1}).lean();
            const result = []
            result.push(channels[0])
            const populatedChannels = await Promise.all(result.map(async (channel: any) => {
                const populatedChannel = await ChannelSchema.findById(channel._id) // Retrieve by ID to get Mongoose document
                    .populate({
                        path: 'threads',
                        model: 'Thread',
                    })
                    .exec();
         
                return populatedChannel;
            }));
            console.log("pouplatedchannel",populatedChannels);
            
            return populatedChannels
        }else{
             if (!channels[0]?.threads) {
            console.log("this one");
            return channels;
           
        } 
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
        
       
     },
     addThread: async (threadId:mongoose.Types.ObjectId, ChannelSchema: any, channelName: string) => {
        const existingChannel = await ChannelSchema.findOne({ channelName: channelName });
      
        if (existingChannel) {
           
            
          existingChannel.threads.push(threadId); // Push the new thread data into the threads array
          const updatedChannel = await existingChannel.save();
      
          return updatedChannel;
        } 
      
        return null; // Return null or handle the case when the channel doesn't exist
      }
}
