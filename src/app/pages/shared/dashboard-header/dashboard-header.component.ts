import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss'],
  animations: [
    trigger('hamburguerX', [
      /*
        state hamburguer => is the regular 3 lines style.
        states topX, hide, and bottomX => used to style the X element
      */
      state('hamburguer', style({})),
      // style top bar to create the X
      state(
        'topX',
        style({
          transform: 'rotate(45deg)',
          transformOrigin: 'left',
          margin: '6px',
        })
      ),
      // hides element when create the X (used in the middle bar)
      state(
        'hide',
        style({
          opacity: 0,
        })
      ),
      // style bottom bar to create the X
      state(
        'bottomX',
        style({
          transform: 'rotate(-45deg)',
          transformOrigin: 'left',
          margin: '6px',
        })
      ),
      transition('* => *', [
        animate('0.2s'), // controls animation speed
      ]),
    ]),
  ]
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
    this.isMenuOpen = !this.isMenuOpen;
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
