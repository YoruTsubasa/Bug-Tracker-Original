import { Component } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";
import {UserRegisterModel} from "../../models/UserRegisterModel";
import {Router} from "@angular/router";


@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent {

  registerForm = this.formBuilder.group({
    firstName: '',
    lastName: '',
    email: '',
    place: '',
    password: '',
    confirmPassword: ''
  });

  constructor(private userService: UserService, private formBuilder : FormBuilder, private router: Router) {} // dependency injection

  onSubmit(): void { // register user
    var user = new UserRegisterModel(this.registerForm.controls['firstName'].value, this.registerForm.controls['lastName'].value,
      this.registerForm.controls['place'].value, this.registerForm.controls['email'].value, this.registerForm.controls['password'].value
    );
    this.userService.registerUser(user).subscribe((result)=> console.log(result));
    this.router.navigate(['login']);
    this.registerForm.reset();
  }
}
