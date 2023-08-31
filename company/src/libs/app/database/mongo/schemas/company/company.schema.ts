import mongoose, { Schema, Document, Model } from 'mongoose';
// import { Password } from './path/to/Password'; // Replace this with the correct path to the Password utility or module.

// Define the Company attributes interface
interface CompanyAttrs {
    companyName: string;
    companyEmail: string;
    companyDescription: string;
    superUsers?: mongoose.Types.ObjectId[];
    budget?:number
}

// Define the Company document interface
export interface CompanyDoc extends Document {
  companyName: string;
  companyEmail: string;
  companyDescription: string;
  superUsers: mongoose.Types.ObjectId[];
  budget?: number;
  updatedAt?: Date;
  version?: number;
  inviteLinks:[]
}


// Define the Company static methods interface
interface CompanyModel extends Model<CompanyDoc> {
  build(attrs: CompanyAttrs): CompanyDoc;
}

  // Define the Company schema
  const companySchema: Schema<CompanyDoc> = new mongoose.Schema(
    {
      companyName: { type: String },
      companyEmail: { type: String },
      companyDescription: { type: String },
      superUsers: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
      budget:{ type: Number },
      updatedAt: { type: Date, default: Date.now },
      version: { type: Number, default: 0 },
      inviteLinks: [
        {
          link: { type: String, required: true },
          createdAt: { type: Date, default: Date.now },
          expiresAt: { type: Date, expires: '30m', default: Date.now }, 
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
companySchema.statics.build = (attrs: CompanyAttrs,Company:any) => {
  return new Company(attrs);
};


// Create the Company model using the schema and export it
// const Company = mongoose.model<CompanyDoc, CompanyModel>('Company', companySchema);
export { companySchema };
