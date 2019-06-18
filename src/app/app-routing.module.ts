import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { SignupComponent } from './Auth/signup/signup.component';
import { AppStartComponent } from './app-start/app-start.component';
import { AdminComponent } from './roles/admin/admin.component';
import { ClientComponent } from './roles/client/client.component';
import { AuthGuard } from './Auth/auth.guard';
import { ChangePasswordComponent } from './Auth/change-password/change-password.component';

const routes: Routes = [
  {path: '', component:AppStartComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'admin', component: AdminComponent, canActivate:[AuthGuard]},
  {path: 'client', component: ClientComponent, canActivate:[AuthGuard]},
  {path: 'changePassword', component: ChangePasswordComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
