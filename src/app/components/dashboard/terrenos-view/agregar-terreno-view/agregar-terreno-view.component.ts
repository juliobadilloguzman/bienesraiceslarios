import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agregar-terreno-view',
  templateUrl: './agregar-terreno-view.component.html',
  styleUrls: ['./agregar-terreno-view.component.scss']
})
export class AgregarTerrenoViewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  getTodayDate(): Date{
    return new Date();
  }

}
