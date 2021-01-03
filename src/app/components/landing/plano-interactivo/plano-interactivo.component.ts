import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plano-interactivo',
  templateUrl: './plano-interactivo.component.html',
  styleUrls: ['./plano-interactivo.component.scss']
})
export class PlanoInteractivoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  saludo(){
    alert('hola');
  }

}
