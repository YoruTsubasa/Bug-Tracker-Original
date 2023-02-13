import {Injectable} from '@angular/core';
import {User} from "../models/user";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {UserLoginModel} from "../models/user-login-model";
import {UserRegisterModel} from "../models/UserRegisterModel";
import {Router} from "@angular/router";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userAPI = "user";
  private _loggedIn = new BehaviorSubject('');

  constructor(private httpService: HttpClient, public router: Router) {
  }

  getUsers() :Observable<User[]> {
    var url = this.userAPI + '/users';
    return this.httpService.get<User[]>(url);
  }

  registerUser(user: UserRegisterModel): Observable<UserRegisterModel> { // post
    var url = this.userAPI + '/register';
    return this.httpService.post<UserRegisterModel>(url, user);
  }

  login(userLoginModel: UserLoginModel): Observable<string> {
    var url = this.userAPI + '/login';
    return this.httpService.post(url, userLoginModel, {responseType: 'text'});
  }

  logout(): void {
    localStorage.setItem('jwtToken', '');
    this.router.navigate(['/login']);
  }

  changeRole(user: User) : void{
    var url = this.userAPI + '/change-role';
    this.httpService.put(url, user).subscribe();
  }
}
