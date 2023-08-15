import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 30000,
};

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      `mongodb://${process.env.MONGO_URI}:27017/?authSource=admin`,
      mongoOptions
    );
    console.log(process.env.MONGO_URI);
    
    console.log(`Connected to ${conn.connections[0].name}:${conn.connections[0].port}`);
    return conn;
  } catch (error:any) {
    console.log(error.message);
    throw error;
  }
};

export { connectDB };
