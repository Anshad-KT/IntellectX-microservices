import mongoose from "mongoose";
import { Password } from "../../../../../utils/password";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

export interface EmployeeAttrs {
  email?: string;
  password?: string;
  username?: string;
  role?: string;
  salary?: string;
}

interface EmployeeModel extends mongoose.Model<EmployeeDoc> {
  build(attrs: EmployeeAttrs): EmployeeDoc;
}

interface EmployeeDoc extends mongoose.Document {

    username:string
    email:string
    password:string
    role: string;
    salary: string;
    attendance: {
      subject: string;
      description: string;
      mode: string;
    }[];
    updatedAt: string;
    version: number;

}

const employeeSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
    },
    salary: {
      type: String,
    },
    attendance: [
      {
        subject: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        mode: {
          type: String,
          required: true,
        },
      },
    ],
    updatedAt: {
      type: Date,
      default: Date.now,
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


employeeSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

employeeSchema.set("versionKey", "version");
employeeSchema.plugin(updateIfCurrentPlugin);

employeeSchema.statics.build = (attrs: EmployeeAttrs,Employee:any) => {
  return new Employee(attrs);
};

// const User = mongoose.model<EmployeeDoc, EmployeeModel>("User", employeeSchema);

export { employeeSchema };
