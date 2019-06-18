import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  hide1 = true;
  hide2 = true;
  enteredPassword = false;
  formError: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onResetPassword(passwordResetForm: NgForm) {
    if (passwordResetForm.value.newPassword === passwordResetForm.value.newRetypedPassword) {
      this.formError = '';
      this.authService.changePassword(passwordResetForm.value.newPassword);
    } else {
      this.formError = 'Entered Password Not Matched';
    }
  }
}
