import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb://"+"tenant-mongo-srv" + ":27017/intellectX-tenants"
    );
    console.log(`Auth-db connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.log(error.message);
    process.exit(1);
  }
};

export { connectDB };
