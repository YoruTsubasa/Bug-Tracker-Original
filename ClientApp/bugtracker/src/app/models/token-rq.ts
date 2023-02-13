export class TokenRQ{
  token: string | null;

  constructor(jwtToken: string | null){
    this.token = jwtToken;
  }
}
