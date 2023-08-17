

import mongoose from "mongoose";

export interface chatData{
    from: mongoose.Types.ObjectId; 
    fileType: string;
  }
  
  export class Thread {
   
    from: mongoose.Types.ObjectId; // Use Types.ObjectId instead of mongoose.Types.ObjectId
    fileType:string
  
    constructor({fileType,from}: chatData) {
      this.from = from;
      this.fileType = fileType;
    }
  }
  