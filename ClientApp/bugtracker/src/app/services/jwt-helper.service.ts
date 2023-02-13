import {Injectable, InjectionToken} from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root',
})
export class JwtHelperServiceClass {

  constructor(private jwtTokenHelper: JwtHelperService) { }

  isTokenExpired() : boolean {
    return this.jwtTokenHelper.isTokenExpired(this.jwtTokenHelper.tokenGetter().toString());
  }

  decodeToken() : any{
    return this.jwtTokenHelper.decodeToken(this.jwtTokenHelper.tokenGetter().toString());
  }
}
export const JWT_HELPER = new InjectionToken<JwtHelperServiceClass>('logger.plugin');
