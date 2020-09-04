import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Output() navOpenEvent = new EventEmitter();
  @Input() color: string = '';
  @Input() logo: string = '';

  constructor() { }

  ngOnInit() {
  }

  toggleNav(){
    this.navOpenEvent.emit()
 }

}
