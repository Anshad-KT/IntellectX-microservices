import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the Tenant attributes interface
interface TenantAttrs {
    tenantName: string;
}

// Define the Tenant document interface
interface TenantDoc extends Document {
  tenantName: string;
}

// Define the Tenant static methods interface
interface TenantModel extends Model<TenantDoc> {
  build(attrs: TenantAttrs): TenantDoc;
}

// Define the Tenant schema
const tenantSchema: Schema<TenantDoc> = new mongoose.Schema(
  {
    tenantName: { type: String, required: true },
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

// Define the static build method to create a new Tenant document
tenantSchema.statics.build = (attrs: TenantAttrs,companySchema:any) => {
  const Tenant = mongoose.model<TenantDoc, TenantModel>('Tenant', tenantSchema);
  return new Tenant(attrs);
};

// Create the Tenant model using the schema and export it
//const Tenant = mongoose.model<TenantDoc, TenantModel>('Tenant', tenantSchema);
export {  tenantSchema };
