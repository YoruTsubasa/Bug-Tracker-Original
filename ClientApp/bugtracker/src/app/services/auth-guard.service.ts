import {Injectable, InjectionToken, Pipe} from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import {AuthService} from "./auth.service";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private authService: AuthService, private router: Router) { }
  canActivate(): Observable<boolean> {
    var token = localStorage.getItem('jwtToken');
    var isValidToken: boolean = false;

    if(!token){
      this.router.navigate(['login']);
      return new Observable<false>;
    }

    if (this.authService.isAuthenticated()) {
      this.router.navigate(['login']);
      return new Observable<false>;
    }

    return this.authService.verifyToken().pipe(map((result)=>{
        if(result)
          return true;

        this.router.navigate(['login']);
        return false;
    }))
  }
}
export const AUTH_GUARD = new InjectionToken<AuthGuardService>('guard.plugin');
