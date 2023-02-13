import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SuperHeroComponent} from './components/super-hero/super-hero.component';
import {LoginComponent} from './components/login/login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {InterceptorService} from "./services/interceptor.service";


import {HomeComponent} from './components/home/home.component';
import {UserRegisterComponent} from './components/user-register/user-register.component';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import {TextInputComponent} from './components/templates/text-input/text-input.component';
import {FormControlPipe} from "./pipes/form-control-pipe";
import {JwtHelperService, JwtModule} from "@auth0/angular-jwt";
import {AuthService} from "./services/auth.service";
import {AuthGuardService} from "./services/auth-guard.service";
import {ManageUserRolesComponent} from './components/manage-user-roles/manage-user-roles.component';
import {RoleGuardService} from "./services/role-guard.service";
import {JwtHelperServiceClass, JWT_HELPER} from "./services/jwt-helper.service";
import {UserService} from "./services/user.service";
import {SortPipe} from "./pipes/sort-pipe";
import {PaginationPipe} from "./pipes/pagination-pipe";
import { ProjectsComponent } from './components/projects/projects.component';
import {ProjectService} from "./services/project-service.service";
import { TicketsComponent } from './components/tickets/tickets.component';
import {TicketService} from "./services/ticket-service.service";
import { TicketDetailsComponent } from './components/ticket-details/ticket-details.component';

@NgModule({
  declarations: [
    AppComponent,
    SuperHeroComponent,
    LoginComponent,
    HomeComponent,
    UserRegisterComponent,
    ForgotPasswordComponent,
    TextInputComponent,
    FormControlPipe,
    ManageUserRolesComponent,
    SortPipe,
    PaginationPipe,
    ProjectsComponent,
    TicketsComponent,
    TicketDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('jwtToken')!
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
    {
      provide: JWT_HELPER,
      useClass : JwtHelperServiceClass,
      multi : true
    },
    [JwtHelperService],
    [AuthGuardService],
    [RoleGuardService],
    [UserService],
    [AuthService],
    [ProjectService],
    [TicketService]
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
