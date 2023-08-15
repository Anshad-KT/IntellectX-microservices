import mongoose from "mongoose";

export interface ThreadData {
    threadName: mongoose.Types.ObjectId;
    chat: {
      from: mongoose.Types.ObjectId; // Use Types.ObjectId instead of mongoose.Types.ObjectId
      fileType: string;
      Date: Date; 
    }[]
}
  
  export class Thread {
   threadName: mongoose.Types.ObjectId;
    constructor({threadName}: ThreadData) {
      this.threadName = threadName;
    }
  }
  