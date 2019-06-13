import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: "root"})
export class RoleService {

  constructor(private http: HttpClient) {}

  adminService() {
    this.http.get('http://localhost:3000/api/roles/admin')
    .subscribe(response => { console.log(response); })
  }

  clientService() {
    this.http.get('http://localhost:3000/api/roles/client')
    .subscribe(response => { console.log(response); })
  }

}
