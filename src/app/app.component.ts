import { Component, OnInit } from '@angular/core';
import { AuthService } from './Auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'role-based-access-project';

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.authService.autoAuthUser();
  }
}
