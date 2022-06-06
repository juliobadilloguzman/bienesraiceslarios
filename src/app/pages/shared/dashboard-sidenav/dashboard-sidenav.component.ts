import { Component, OnInit, Output, EventEmitter, ɵConsole } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from 'src/app/models/account';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard-sidenav',
  templateUrl: './dashboard-sidenav.component.html',
  styleUrls: ['./dashboard-sidenav.component.scss']
})
export class DashboardSidenavComponent implements OnInit {

  account: Account;

  @Output() toggler = new EventEmitter<any>();

  constructor(public router: Router, private _authService: AuthService) {

  }

  ngOnInit(): void {
    this.account = JSON.parse(localStorage.getItem('authData'));
  }

  toggle(route?: string) {
    this.navigate(route);
    this.toggler.emit();
  }

  navigate(path: string) {
    this.router.navigateByUrl(path);
  }


  isAdmin(): boolean {
    const admin = this.account.roles.find(rol => rol.idRol == 1);
    if (admin)
      return true;

    return false;
  }

  isCliente(): boolean {
    const client = this.account.roles.find(rol => rol.idRol == 2);
    if (client)
      return true;

    return false;
  }

  logOut(): void {
    this._authService.logOut();
    this.router.navigateByUrl('/login');
  }

}
