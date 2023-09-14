import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";


interface UserAttrs {
  email?: string;
  username?: string;
}

interface UserModal extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

interface UserDoc extends mongoose.Document {
  email: string;
  name: string;
  updatedAt: string;
  version: number;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    username: {
      type: String, 
      required: true,
    },
    id:{
      type:String
    },
    savedThreads:[
    {
      id: {
        type: mongoose.Types.ObjectId,
      
      },
    },
  ],
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



userSchema.set("versionKey", "version");
userSchema.plugin(updateIfCurrentPlugin);

userSchema.statics.build = (attrs: UserAttrs) => {
   
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModal>("User", userSchema); 

 export { userSchema };
