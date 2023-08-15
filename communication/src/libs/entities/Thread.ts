import mongoose from "mongoose";

export interface ThreadData {
    threadName: string
    chat: {
      from: mongoose.Types.ObjectId; // Use Types.ObjectId instead of mongoose.Types.ObjectId
      fileType: string;
      Date: Date; 
    }[]
}
  
  export class Thread {
   threadName: string
    constructor({threadName}: ThreadData) {
      this.threadName = threadName;
    }
  }
  