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
    }, ChatSchema: any) => {
        const newChat = new ChatSchema(chat);
        const mongooseObject = await newChat.save();
        return mongooseObject;
    },
     getChat : async (ThreadSchema:any, threadName:string) => {
        try {
            const thread = await ThreadSchema.findById( threadName )
    
            if (!thread) {
                throw new Error('Thread not found');
            }
    
            if (thread.chat && thread.chat.length > 0) {
                const populatedThread = await ThreadSchema.findById(thread._id)
                    .populate({
                        path: 'chat',
                        model: 'Chat',
                        options: { sort: { createdAt: 1 } }, // Sort chats by createdAt in ascending order
                    })
                    .exec();
    
                return populatedThread;
            }
    
            return thread;
        } catch (error) {
            throw error;
        }
    }
    
}
