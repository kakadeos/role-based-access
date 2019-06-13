import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  maxDate;

  constructor(public authService : AuthService) { }

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear()-18);
  }

  onCreateAccount(signupForm : NgForm) {
    if(signupForm.invalid){
      return;
    }
    this.authService.createUser(signupForm.value.email, signupForm.value.password);
  }
}
