import mongoose, { Schema, Document, Model } from 'mongoose';
// import { Password } from './path/to/Password'; // Replace this with the correct path to the Password utility or module.

// Define the Company attributes interface
interface CompanyAttrs {
    companyName: string;
    companyEmail: string;
    companyDescription: string;
    superUsers?: mongoose.Types.ObjectId[];
    employees: mongoose.Types.ObjectId[];
    budget?:number
}

// Define the Company document interface
interface CompanyDoc extends Document {
  companyName: string;
  companyEmail: string;
  companyDescription: string;
  superUsers: mongoose.Types.ObjectId[];
  employees: {
    id: mongoose.Types.ObjectId;
    age: number;
    role: string;
    salary: string;
    attendance: {
      subject: string;
      description: string;
      mode: string;
    }[];
  }[];
  budget?: number;
  updatedAt?: Date;
  version?: number;
}


// Define the Company static methods interface
interface CompanyModel extends Model<CompanyDoc> {
  build(attrs: CompanyAttrs): CompanyDoc;
}

// Define the Company schema
const companySchema: Schema<CompanyDoc> = new mongoose.Schema(
  {
    companyName: { type: String, required: true },
    companyEmail: { type: String, required: true },
    companyDescription: { type: String, required: true },
    superUsers: [{ type: mongoose.Types.ObjectId, ref: 'User', required: true }],
    employees: [
      {
        id: { type: mongoose.Types.ObjectId,ref: 'User', required: true },
        age: { type: Number, required: true },
        role: { type: String, required: true },
        salary: { type: String, required: true },
        attendance: [
          {
            subject: { type: String, required: true },
            description: { type: String, required: true },
            mode: { type: String, required: true },
          },
        ],
      },
    ],
    budget:{ type: Number, required: true },
    updatedAt: { type: Date, default: Date.now },
    version: { type: Number, default: 0 },
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

// Define the pre-save hook for hashing the password before saving
// companySchema.pre('save', async function (done) {
//   if (this.isModified('password')) {
//     const hashed = await Password.toHash(this.get('password'));
//     this.set('password', hashed);
//   }
//   done();
// });

// Set the version key for optimistic concurrency control
companySchema.set('versionKey', 'version');

// Add any other necessary plugins or options for the schema

// Define the static build method to create a new Company document
companySchema.statics.build = (attrs: CompanyAttrs) => {
  return new Company(attrs);
};


// Create the Company model using the schema and export it
const Company = mongoose.model<CompanyDoc, CompanyModel>('Company', companySchema);
export { Company,companySchema };
