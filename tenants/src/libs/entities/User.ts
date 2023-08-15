export interface UserData {
  email?: string;
  username?: string;
  password: string;
}

export class User {
  email?: string;
  username?: string;
  password: string;

  constructor({ email, username, password }: UserData) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
}
