import mongoose from "mongoose";

export interface UserData {
  email?: string;
  username: string;
  password?: string;
  id:mongoose.Types.ObjectId
}

export class User {
  email?: string;
  username: string;
  password?: string;
  id:mongoose.Types.ObjectId
  constructor({ email, username, password,id }: UserData) {
    this.username = username;
    this.email = email;
    this.id=id
  }
}
