import { Component, OnInit } from '@angular/core';
import { RoleService } from '../roles.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(public roleService : RoleService) { }

  ngOnInit() {
    this.roleService.adminService();
  }

}
