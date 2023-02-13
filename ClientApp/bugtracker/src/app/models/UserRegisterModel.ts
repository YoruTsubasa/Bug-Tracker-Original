export class UserRegisterModel {
  firstName : string | null;
  lastName : string | null;
  place : string | null;
  email : string | null;
  password : string | null;

  constructor(firstName: string | null, lastName: string | null, place: string | null, email: string | null, password: string | null) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.place = place;
    this.email = email;
    this.password = password;
  }
}
