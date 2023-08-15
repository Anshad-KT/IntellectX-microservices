

import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 30000,
}

const connectDB =  () => {
  return new Promise((resolve, reject) => {
    const mongoURL = `mongodb://${process.env.MONGO_URI}:27017/?authSource=admin`
    mongoose
      .connect(mongoURL, mongoOptions)
      .then((conn) => {
        console.log(`connected to ${conn.connections[0].name}:${conn.connections[0].port}`)
        resolve(conn)
      })
      .catch((error) => reject(error))
  })
}

export {connectDB} 
