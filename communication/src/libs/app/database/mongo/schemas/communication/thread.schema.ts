import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

export interface ThreadAttrs {
    threadName: string;
    chat: {
      from: mongoose.Types.ObjectId; // Use Types.ObjectId instead of mongoose.Types.ObjectId
      fileType: string;
      Date: Date; 
    };
}


interface ThreadDoc extends mongoose.Document {

    threadName: string;
    chat: {
      from: mongoose.Types.ObjectId; 
      fileType: string;
      Date: Date;
    }[];
    version: number;

}

const threadSchema = new mongoose.Schema(
    {
      threadName: {
        type: String,
        required: true,
      },
      chat: [
        {
          from: {
            type: mongoose.Schema.Types.ObjectId, // Use Schema.Types.ObjectId
            ref:"User",
            required: true,
          },
          fileType: {
            type: String,
            required: true,
          },
          Date: {
            type: Date, // Use Date type directly
            default: Date.now,
          },
        },
      ],
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
  



threadSchema.set("versionKey", "version");
threadSchema.plugin(updateIfCurrentPlugin);



export { threadSchema };
