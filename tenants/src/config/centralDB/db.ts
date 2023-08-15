import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb://"+process.env.MONGO_URI + ":27017/intellectX-tenants"
    );
    console.log(`Auth-db connected: ${conn.connections[0].host}:${conn.connections[0].port}`);
  } catch (error: any) {
    console.log(error.message);
    process.exit(1);
  }
};

export { connectDB };
 