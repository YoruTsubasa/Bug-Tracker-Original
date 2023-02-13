export class User {
  guid = "";
  firstName : string | null;
  lastName : string | null;
  place : string | null;
  email : string | null;
  type : number;


  constructor(firstName: string | null, lastName: string | null, place: string | null, email: string | null, type: number) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.place = place;
    this.email = email;
    this.type = type;
  }
}
