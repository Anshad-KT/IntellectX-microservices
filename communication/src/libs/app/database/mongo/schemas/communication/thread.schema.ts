import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface ThreadAttrs {
  threadName: string;
  chat: [];
}

export interface ThreadDoc extends mongoose.Document {
  threadName: string;
  chat: [];
  version: number;
}

const threadSchema = new mongoose.Schema(
  {
    threadName: {
      type: String,
      required: true,
    },
    chat: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chat" }],
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
      },
    },
  }
);

threadSchema.set("versionKey", "version");
threadSchema.plugin(updateIfCurrentPlugin);

const Thread = mongoose.model<ThreadDoc>("Thread", threadSchema);

export { Thread, threadSchema };
