// {
//     from: mongoose.Types.ObjectId; // Use Types.ObjectId instead of mongoose.Types.ObjectId
//     fileType: string;
//     Date: Date; 
//   }

import mongoose, { mongo } from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

export interface channelAttrs {
    
        from: mongoose.Types.ObjectId; // Use Types.ObjectId instead of mongoose.Types.ObjectId
        fileType: string;
        content:string
        Date: Date; 
}


interface chatDoc extends mongoose.Document {
    from: mongoose.Types.ObjectId; // Use Types.ObjectId instead of mongoose.Types.ObjectId
    fileType: string;
    content:string
    Date: Date; 
}

const chatSchema = new mongoose.Schema(
    {
      from: {
        type: mongoose.Types.ObjectId,
        ref:"User",
        required: true,
      },
      fileType:{
        type:String,
        required:true
      },
      content:{
        type:String,
        trim:true,
        required:true
      },
      createdAt: {
        type:Date,
        default:Date.now
      },
      version: {
        type: Number,
        default: 0,
      },
    },
    {
      toJSON: {
        transform(doc, ret) {
          ret.id = ret._id;
          delete ret._id;
          delete ret.password;
        },
      },
    }
  );
  



chatSchema.set("versionKey", "version");
chatSchema.plugin(updateIfCurrentPlugin);



export { chatSchema };
