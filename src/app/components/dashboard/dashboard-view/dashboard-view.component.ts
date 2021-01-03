import { Component, OnInit, HostListener } from '@angular/core';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.scss']
})
export class DashboardViewComponent implements OnInit {

  public isMenuOpen = false;
  public isMobile: boolean;
  public isDesktop: boolean;

  constructor(public sidenav: SidenavService) {
  }

  ngOnInit() {
    this.onResize();
  }

  toggle() {
    if (!this.isMobile) {
      this.isMenuOpen = !this.isMenuOpen;
    } else {
      this.sidenav.status = !this.sidenav.status;
    }
  }

  // device size
  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    const w = window.innerWidth;
    this.isMobile = (w < 769) ? true : false;
    this.isDesktop = (w > 1999) ? true : false;
    this.sidenav.update(this.isMobile, this.isDesktop);
  }

  sidebarChange(event) {
    this.toggle();
  }

}
