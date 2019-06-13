import { Component, OnInit } from '@angular/core';
import { RoleService } from '../roles.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  constructor(public roleService: RoleService) { }

  ngOnInit() {
    this.roleService.clientService();
  }

}
