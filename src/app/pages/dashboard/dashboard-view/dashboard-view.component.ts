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

  constructor(public sidenavService: SidenavService) {
  }

  ngOnInit() {
    this.onResize();
  }

  toggle() {
    if (!this.isMobile) {
      this.isMenuOpen = !this.isMenuOpen;
      this.sidenavService.status = !this.sidenavService.status;
    } else {
      this.sidenavService.status = !this.sidenavService.status;
    }
  }

  // device size
  @HostListener('window:resize', ['$event'])
  onResize(event?: any): void {

    const w = window.innerWidth;
    this.isMobile = w < 769;
    this.isDesktop = w > 1999;
    this.sidenavService.update(this.isMobile, this.isDesktop);

  }


}
