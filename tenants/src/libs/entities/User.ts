export interface UserData {
  email?: string;
  username?: string;
  password: string;
  currentCompany: string
  
}

export class User {
  email?: string;
  username?: string;
  password: string;
  currentCompany: string

  constructor({ email, username, password, currentCompany }: UserData) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.currentCompany = currentCompany
  }
}
