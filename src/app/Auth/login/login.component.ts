import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  private dialogRef ;

  constructor(public authService: AuthService, private dialog: MatDialog) { }

  ngOnInit() {
  }

  onLogin(loginForm : NgForm) {
    if(loginForm.invalid) {
      return;
    }
    this.authService.login(loginForm.value.email, loginForm.value.password);
  }

  forgotPassword() {
    this.dialogRef = this.dialog.open(ForgotPasswordComponent, {data: {
      email: this.email
    }});
    this.dialogRef.afterClosed().subscribe(
      result => {
        if (result === false) {
          return;
        } else if (result === undefined) {
          return;
        } else {
          this.authService.forgotPassword(result);
        }
      }
    );
  }


}
