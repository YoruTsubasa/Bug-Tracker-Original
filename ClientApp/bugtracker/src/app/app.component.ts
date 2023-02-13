import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "./services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bugtracker';

  private loggedIn: boolean = false;

  constructor(public router: Router, public userService: UserService) {
  }


  toggleLogIn() : void {
    this.loggedIn = !this.loggedIn;
  }

  logout(): void{
    this.userService.logout();
  }
}
