import {Injectable, InjectionToken} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from "@angular/router";
import {JwtHelperServiceClass} from "./jwt-helper.service";
import {TokenClaims} from "../enums/tokenClaims";

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate{

  constructor(private router: Router, private jwtHelper: JwtHelperServiceClass) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let roles = route.data['roles'] as Array<string>;

    const tokenObject = this.jwtHelper.decodeToken();
    let userRole = tokenObject[TokenClaims.Role];


    if(roles.indexOf(userRole) >= 0){
      console.log(roles.indexOf(tokenObject[TokenClaims.Role]));
      return true;
    }

    return false;
  }
}
export const ROLE_GUARD = new InjectionToken<RoleGuardService>('role.plugin');
