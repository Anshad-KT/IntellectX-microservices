import mongoose from "mongoose";
import { EmployeeAttrs } from "../../database/mongo/schemas/company/employee.schema";
import { Channel } from "../../../entities/Channel";

export = {
    addChannel: async (channel:Channel,ChannelSchema:any) => {
        const mongooseObject = await ChannelSchema.findOne({channelName:channel.channelName});
        if (!mongooseObject) {

            const newChannel = new ChannelSchema(channel); 
            const mongooseObject = await newChannel.save(); 
        
            return mongooseObject;
          }
        return mongooseObject;
    },
};
