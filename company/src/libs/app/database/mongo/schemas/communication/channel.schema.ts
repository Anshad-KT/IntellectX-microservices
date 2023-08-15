import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface ChannelAttrs {
  creator: mongoose.Types.ObjectId;
  superUsers: mongoose.Types.ObjectId[];
  previlagedUsers: mongoose.Types.ObjectId[];
  createdAt?: Date;
  threads: mongoose.Types.ObjectId[];
}

interface ChannelDoc extends mongoose.Document {
  creator: mongoose.Types.ObjectId;
  superUsers: mongoose.Types.ObjectId[];
  previlagedUsers: mongoose.Types.ObjectId[];
  createdAt?: Date;
  threads: mongoose.Types.ObjectId[];
  version: number;
}

const channelSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the "User" model
      required: true,
    },
    superUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the "User" model
        required: true,
      },
    ],
    previlagedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the "User" model
        required: true,
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    threads: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Thread", // Reference to the "Thread" model
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

channelSchema.set("versionKey", "version");
channelSchema.plugin(updateIfCurrentPlugin);


export { channelSchema };
