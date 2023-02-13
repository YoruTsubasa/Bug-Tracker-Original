import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SuperHeroComponent} from './components/super-hero/super-hero.component';
import {LoginComponent} from "./components/login/login.component";
import {UserRegisterComponent} from "./components/user-register/user-register.component";
import {ForgotPasswordComponent} from "./components/forgot-password/forgot-password.component";
import {HomeComponent} from "./components/home/home.component";
import {AuthGuardService} from "./services/auth-guard.service";
import {ManageUserRolesComponent} from "./components/manage-user-roles/manage-user-roles.component";
import {RoleGuardService} from "./services/role-guard.service";
import {ProjectsComponent} from "./components/projects/projects.component";
import {TicketsComponent} from "./components/tickets/tickets.component";
import {TicketDetailsComponent} from "./components/ticket-details/ticket-details.component";

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'super-hero', component: SuperHeroComponent, canActivate: [AuthGuardService]},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: UserRegisterComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'user-roles', component: ManageUserRolesComponent, canActivate: [RoleGuardService], data: {roles: ['Admin']}},
  {path: 'projects', component: ProjectsComponent},
  {path: 'tickets', component: TicketsComponent},
  {path: 'ticket-details/:guid', component: TicketDetailsComponent},
  {path: '**', redirectTo: '/login', pathMatch: 'full'}, // invalid urls
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
