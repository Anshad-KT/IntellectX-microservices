export interface UserData {
  email?: string;
  username: string;
  password?: string;
  id:string
}

export class User {
  email?: string;
  username: string;
  password?: string;
  id:string
  constructor({ email, username, password,id }: UserData) {
    this.username = username;
    this.email = email;
    this.id=id
  }
}
