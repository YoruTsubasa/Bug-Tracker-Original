import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {TokenRQ} from "../models/token-rq";
import {JwtHelperServiceClass} from "./jwt-helper.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userAPI = "authentication";

  constructor( private httpService: HttpClient, private jwtHelper: JwtHelperServiceClass) { }
  public isAuthenticated(): boolean {
    var isExpired: boolean = true;

    try {
      isExpired = this.jwtHelper.isTokenExpired()
    }catch(error: any){
      console.log(error);
      return false;
    }

    return isExpired;
  }

  public verifyToken() : Observable<boolean>{
    var url = this.userAPI + '/verify-token';
    let tokenRQ = new TokenRQ(localStorage.getItem('jwtToken'));

    return this.httpService.post<boolean>(url, tokenRQ);
  }
}
