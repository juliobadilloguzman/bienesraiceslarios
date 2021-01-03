import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-sidenav',
  templateUrl: './dashboard-sidenav.component.html',
  styleUrls: ['./dashboard-sidenav.component.scss']
})
export class DashboardSidenavComponent implements OnInit {

  @Output() toggler = new EventEmitter<any>();

  constructor(public router: Router) {

  }

  ngOnInit(): void {
  }

  toggle() {
    this.toggler.emit();
  }

  saludar(){
    this.router.navigateByUrl('/dashboard/terrenos');
  }

  isReportPage() {
    return !!(this.router.url.match('dashboard/reports') || this.router.url.match('dashboard/report-approver'));
  }

  isSubMenu(route) {
    return this.router.url.match(route) ? true : false;
  }

}
