export class UserLoginModel {
  email : string | null = null;
  password : string | null = null;
  token : string | null = "";

  constructor(email : string | null, password : string | null, token : string | null){
    this.email = email;
    this.password = password;
    this.token = token;
  }
}
