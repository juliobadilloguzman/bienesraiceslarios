import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CotizadorService } from 'src/app/services/cotizador.service';
import { DownloadService } from 'src/app/services/download.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cotizador-view',
  templateUrl: './cotizador-view.component.html',
  styleUrls: ['./cotizador-view.component.scss']
})
export class CotizadorViewComponent implements OnInit {

  terrenosForm: FormGroup;
  planPagoForm: FormGroup;

  terrenos: any;

  //Terrenos who chose the cliente
  terrenosSelected: any[] = [];

  //Filtered terrenos
  filteredTerrenos: any[] = [];

  readonly costoM2Financiamiento: number = 820;
  readonly costoM2Contado: number = 738;

  showLoading: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _cotizadorService: CotizadorService,
    private downloadService: DownloadService,
    private router: Router
  ) { }

  ngOnInit() {

    this.getAllTerrenos();

    this.terrenosForm = this._formBuilder.group({
      manzana: [null, Validators.required],
      terreno: [null, Validators.required]
    });

    this.planPagoForm = this._formBuilder.group({
      plan: [null, Validators.required],
      numeroMensualidades: [null]
    });

    //Get value changes of manzana
    this.manzana.valueChanges.subscribe(

      (numeroManzana: number) => {

        this.filteredTerrenos = this.terrenos[`manzana${numeroManzana}`];

      }

    );

  }

  get manzana() {
    return this.terrenosForm.get('manzana') as FormControl;
  }

  get terreno() {
    return this.terrenosForm.get('terreno') as FormControl;
  }

  get plan() {
    return this.planPagoForm.get('plan') as FormControl;
  }

  get numeroMensualidades() {
    return this.planPagoForm.get('numeroMensualidades') as FormControl;
  }

  getAllTerrenos(): void {

    this._cotizadorService.getTerrenosFromFraccionamiento('realcampestre').subscribe(
      (response: any) => {
        this.terrenos = response;
      }
    );

  }

  range(start, end) {

    var foo = [];

    for (var i = start; i <= end; i++) {
        foo.push(i);
    }

    return foo;
    
}

  onAddTerreno(): void {

    if (this.terrenosSelected.indexOf(this.terreno.value) == -1) {
      this.terrenosSelected.push(this.terreno.value);
    }

  }

  generateCotizacion(){

    this.showLoading = true;

    setTimeout(() => {
      this.showLoading = false;
      this.downloadCotizacion();
    }, 2500);

  }

  openPlano(){
    window.open('/assets/img/planos/residencialcampestre.pdf', '_blank');
  }


  downloadCotizacion(){
    this.downloadService.generateCotizacion(this.terrenosSelected, { plan: this.plan.value, numeroMensualidades: (this.plan.value == 'financiamiento') ? this.numeroMensualidades.value : null });
  }

  deleteTerreno(index): void {
    this.terrenosSelected.splice(index, 1);
  }

  reloadPage(): void{
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/cotizador']);
  }


}
