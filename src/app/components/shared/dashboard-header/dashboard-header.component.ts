import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent implements OnInit {

  @Output() toggleEmit = new EventEmitter<any>();
  @Input() isMenuOpen;
  public isDropdownOpen = true;
  public userImage = '/assets/images/dashboard/default-user.png';
  public logoImage = '/assets/images/public/branding/logo-blue.png';

  constructor(public router: Router, private _authService: AuthService) { }

  ngOnInit() {
  }

  toggle() {
    this.toggleEmit.emit();
  }

  goToHome() {
    this.router.navigateByUrl('/');
  }

  logOut(): void {
    this._authService.logOut();
    this.router.navigateByUrl('/login');
  }

}
