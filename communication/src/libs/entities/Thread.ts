import mongoose from "mongoose";

export interface ThreadData {
    threadName: string
    chat: []
}
  
  export class Thread {
   threadName: string
    constructor({threadName}: ThreadData) {
      this.threadName = threadName;
    }
  }
  