import {Component} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {UserLoginModel} from "../../models/user-login-model";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = this.formBuilder.group({
    email: '',
    password: ''
  });

  constructor(private userService: UserService, private authService: AuthService , private formBuilder: FormBuilder, private router: Router) {
  }

  onSubmit(): void { // login
    if(!this.loginForm.valid) {
      console.log('formGroup not valid');
      return;
    }

    localStorage.removeItem('jwtToken');
    var userLoginModel = new UserLoginModel(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value, "");

    this.userService.login(userLoginModel).subscribe((result)=>{
      result.replace(/\s\n/g, "");
      if(result){
        localStorage.setItem('jwtToken', result); // put token in localStorage
      }

    }, (error)=> {

      console.log('something went wrong when trying to log in.');
      console.log(error.message);
      return;

    }, () =>{
        this.authService.verifyToken().subscribe((result)=>{
          if(!result){
            console.log('token is not valid.')
            return;
          }

          this.router.navigate(['home']);
          this.loginForm.reset();
        }, (error)=>{
          console.log('something went wrong calling verifyToken.');
          console.log(error.message);
        });
    });
  }
}

