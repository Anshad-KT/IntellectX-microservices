import mongoose from "mongoose";

export interface ChannelData {
    creator: mongoose.Types.ObjectId;
    channelName:string
    superUsers: mongoose.Types.ObjectId[];
    previlagedUsers: mongoose.Types.ObjectId[];
    createdAt?: Date;
    threads: mongoose.Types.ObjectId[];
  }
  
  export class Channel {
    creator: mongoose.Types.ObjectId;
    channelName:string
    superUsers: mongoose.Types.ObjectId[];
    previlagedUsers: mongoose.Types.ObjectId[];
    createdAt?: Date;
    threads: mongoose.Types.ObjectId[];
    constructor({ channelName,creator,superUsers,previlagedUsers,threads }: ChannelData) {
      this.channelName=channelName
      this.creator = creator;
      this.superUsers = superUsers;
      this.previlagedUsers=previlagedUsers
      this.threads=threads || []
    }
  }
  