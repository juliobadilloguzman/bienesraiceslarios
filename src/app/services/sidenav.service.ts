import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  public position = 'start';
  public mode = 'side';
  public sidenavMd = 13;
  public sidenavSm = 19;
  public sidenavXl = 16;
  public disableClose = true;
  public width = this.sidenavMd;
  public status = false;
  public tooltipTrigger = 'hover:focus';

  constructor() { }

  update(isMobile: boolean, isDesktop: boolean) {
    if (isMobile) {
      this.width = this.sidenavSm;
      this.position = 'end';
      this.mode = 'over';
      this.disableClose = false;
      this.tooltipTrigger = 'click:focus';
    } else {
      this.width = this.sidenavMd;
      this.position = 'start';
      this.mode = 'side';
      this.status = true;
      this.disableClose = true;
      if (isDesktop) {
        this.width = this.sidenavXl;
      } else {
        this.width = this.sidenavMd;
      }
    }
  }
}
