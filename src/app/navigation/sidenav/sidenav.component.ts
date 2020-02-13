import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Auth/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, OnDestroy {

  @Output() sideNavClose = new EventEmitter<void>();
  public userIsAuthenticated = false;
  private authListnerSub: Subscription;
  private roleListnerSubs: Subscription;
  userRole = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListnerSub = this.authService.getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
    this.userRole = this.authService.getRole();
    this.roleListnerSubs = this.authService.getRoleListener()
    .subscribe(role => {
      this.userRole = role;
    });
    //console.log(this.userRole);
  }

  onClose() {
    this.sideNavClose.emit();
  }

  onLogout() {
    this.onClose();
    this.authService.logout();

  }
  ngOnDestroy() {
    this.authListnerSub.unsubscribe();
  }
}
