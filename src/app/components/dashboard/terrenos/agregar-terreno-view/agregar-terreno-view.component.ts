import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { TerrenosService } from 'src/app/services/terrenos.service';
import { Fraccionamiento } from 'src/app/models/fraccionamiento';
import { FraccionamientosService } from 'src/app/services/fraccionamientos.service';
import { Observable } from 'rxjs';
import { Vendedor } from 'src/app/models/vendedor';
import { VendedoresService } from 'src/app/services/vendedores.service';
import { map, startWith } from 'rxjs/operators';
import { ModalType, Modal, ModalResponse } from 'src/app/models/modal';
import { UiActionsService } from 'src/app/services/ui-actions.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { CreateUpdateVendedorModalComponent } from '../../usuarios/vendedores-view/create-update-vendedor-modal/create-update-vendedor-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { DateAdapter } from '@angular/material/core';
import * as moment from 'moment';
import { ConfirmAgregarTerrenoModalComponent } from '../confirm-agregar-terreno-modal/confirm-agregar-terreno-modal.component';
import { Usuario } from 'src/app/models/usuario'
import { CreateUpdateClienteModalComponent } from '../../usuarios/clientes-view/create-update-cliente-modal/create-update-cliente-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-terreno-view',
  templateUrl: './agregar-terreno-view.component.html',
  styleUrls: ['./agregar-terreno-view.component.scss']
})


export class AgregarTerrenoViewComponent implements OnInit {

  isNaN: Function = Number.isNaN;
  isFinite: Function = Number.isFinite;

  terrenoForm: FormGroup;
  pagoDeContado: boolean = false;
  deslindePagado: boolean = false;
  fraccionamientos: Fraccionamiento[];

  //Filter Vendedores
  vendedoresCtrl = new FormControl();
  filteredVendedores: Observable<Vendedor[]>;
  vendedoresList: Vendedor[];
  vendedoresTemp: Vendedor[] = [];

  //Filter Clientes
  clientesCtrl = new FormControl();
  filteredClientes: Observable<Usuario[]>;
  clientesList: Usuario[];
  clienteTemp: Usuario;

  //Temporary values
  costoTotalTemp: number;
  engancheTemp: number;
  montoMensualidadTemp: number;
  noMensualidadesTemp: number;

  //Saldo
  saldoFinal: number;

  constructor(
    private fb: FormBuilder,
    private _terrenosService: TerrenosService,
    private _fraccionamientosService: FraccionamientosService,
    private _vendedoresService: VendedoresService,
    private _uiActionsService: UiActionsService,
    private _usuariosService: UsuariosService,
    public dialog: MatDialog,
    private dateAdapter: DateAdapter<Date>,
    private router: Router
  ) {

    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy

    this.terrenoForm = this.fb.group({
      idTerreno: [],
      noManzana: [null, [Validators.required, Validators.pattern(/^\d+$/), Validators.min(1)]],
      noLote: [null, [Validators.required, Validators.pattern(/^\d+$/), Validators.min(1)]],
      superficie: [null, [Validators.required, Validators.pattern(/^-?\d+\.?\d*$/), Validators.min(1)]],
      costoM2: [null, [Validators.required, Validators.pattern(/^-?\d+\.?\d*$/), Validators.min(1)]],
      enganche: [null],
      formaPagoEnganche: [''],
      pagoAlContado: [0, [Validators.required]],
      costoTotal: [0, [Validators.required]],
      saldo: [],
      fechaVenta: [moment().format('L')],
      noMensualidades: [],
      montoMensualidad: [],
      diaPagoDel: [],
      diaPagoAl: [],
      pagoDeslinde: [0],
      fechaPagoDeslinde: [],
      montoDeslinde: [null],
      fechaPrimeraMensualidad: [],
      comentariosAdicionales: [],
      fraccionamientoIdFraccionamiento: [],
      usuarioIdUsuario: [],
      vendedores: this.fb.array([])
    });

  }

  get idTerreno() {
    return this.terrenoForm.get('idTerreno') as FormControl;
  }

  get noManzana() {
    return this.terrenoForm.get('noManzana') as FormControl;
  }

  get noLote() {
    return this.terrenoForm.get('noLote') as FormControl;
  }

  get superficie() {
    return this.terrenoForm.get('superficie') as FormControl;
  }

  get costoM2() {
    return this.terrenoForm.get('costoM2') as FormControl;
  }

  get enganche() {
    return this.terrenoForm.get('enganche') as FormControl;
  }

  get formaPagoEnganche() {
    return this.terrenoForm.get('formaPagoEnganche') as FormControl;
  }

  get pagoAlContado() {
    return this.terrenoForm.get('pagoAlContado') as FormControl;
  }

  get costoTotal() {
    return this.terrenoForm.get('costoTotal') as FormControl;
  }

  get saldo() {
    return this.terrenoForm.get('saldo') as FormControl;
  }

  get fechaVenta() {
    return this.terrenoForm.get('fechaVenta') as FormControl;
  }

  get noMensualidades() {
    return this.terrenoForm.get('noMensualidades') as FormControl;
  }

  get montoMensualidad() {
    return this.terrenoForm.get('montoMensualidad') as FormControl;
  }

  get diaPagoDel() {
    return this.terrenoForm.get('diaPagoDel') as FormControl;
  }

  get diaPagoAl() {
    return this.terrenoForm.get('diaPagoAl') as FormControl;
  }

  get pagoDeslinde() {
    return this.terrenoForm.get('pagoDeslinde') as FormControl;
  }

  get fechaPagoDeslinde() {
    return this.terrenoForm.get('fechaPagoDeslinde') as FormControl;
  }

  get montoDeslinde() {
    return this.terrenoForm.get('montoDeslinde') as FormControl;
  }

  get fechaPrimeraMensualidad() {
    return this.terrenoForm.get('fechaPrimeraMensualidad') as FormControl;
  }

  get comentariosAdicionales() {
    return this.terrenoForm.get('comentariosAdicionales') as FormControl;
  }

  get fraccionamientoIdFraccionamiento() {
    return this.terrenoForm.get('fraccionamientoIdFraccionamiento') as FormControl;
  }

  get usuarioIdUsuario() {
    return this.terrenoForm.get('usuarioIdUsuario') as FormControl;
  }

  get vendedores(): FormArray {
    return this.terrenoForm.get("vendedores") as FormArray
  }

  async ngOnInit() {

    this.getFraccionamientos();
    this.getVendedores();
    this.getClientes();

  }

  showErrors(control: FormControl): boolean {
    const { dirty, touched, errors } = control;
    return dirty && touched && !!errors;
  }

  private _filterVendedores(value: string): Vendedor[] {
    if (typeof value == "string") {
      const filterValue = value.toLowerCase();
      return this.vendedoresList.filter(vendedor => vendedor.nombre.toLowerCase().indexOf(filterValue) === 0);
    }

  }

  private _filterClientes(value: string): Usuario[] {
    if (typeof value == "string") {
      const filterValue = value.toLowerCase();
      return this.clientesList.filter(cliente => cliente.nombre.toLowerCase().indexOf(filterValue) === 0);
    }

  }

  onAgregarVendedor(): void {
    const dialogRef = this.dialog.open(CreateUpdateVendedorModalComponent, {
      width: '600px',
      data: {
        accion: 'crear'
      }
    });
    dialogRef.afterClosed().subscribe(() => this.getVendedores());
  }

  onAgregarCliente(): void {
    const dialogRef = this.dialog.open(CreateUpdateClienteModalComponent, {
      width: '600px',
      data: {
        accion: 'crear'
      }
    });
    dialogRef.afterClosed().subscribe(() => this.getClientes());
  }

  pushCliente(event: any) {
    this.clienteTemp = event.option.value;
    this.usuarioIdUsuario.patchValue(this.clienteTemp.idUsuario);
    this.clientesCtrl.setValue(null);
  }

  pushVendedor(event: any) {
    if (this.vendedoresTemp.indexOf(event.option.value) == -1) {
      this.vendedoresTemp.push(event.option.value);
      this.vendedoresCtrl.setValue(null);
    }
    this.vendedoresCtrl.setValue(null);
  }

  removeVendedor(vendedor) {
    const index = this.vendedoresTemp.indexOf(vendedor);

    if (index >= 0) {
      this.vendedoresTemp.splice(index, 1);
    }
  }

  getFraccionamientos() {
    this._fraccionamientosService.getFraccionamientos().subscribe(
      (response: Fraccionamiento[]) => {
        if (response) {
          this.fraccionamientos = response;
        } else {
          const modalInformation: Modal = {
            title: "Error",
            message: "Error al cargar la informacion, verifique su conexion a internet e inténtelo de nuevo",
            type: ModalType.confirmation,
            response: ModalResponse.failed
          }
          this._uiActionsService.openConfirmationDialog(modalInformation);
        }
      },
      (error) => {
        const modalInformation: Modal = {
          title: "Error",
          message: "Error al cargar la informacion, verifique su conexion a internet e inténtelo de nuevo",
          type: ModalType.confirmation,
          response: ModalResponse.failed
        }
        this._uiActionsService.openConfirmationDialog(modalInformation);
      }
    )
  }

  getVendedores(): void {
    this._vendedoresService.getVendedores().subscribe(
      (response: Vendedor[]) => {
        this.vendedoresList = response;
        this.filteredVendedores = this.vendedoresCtrl.valueChanges.pipe(
          startWith(''),
          map(vendedor => vendedor ? this._filterVendedores(vendedor) : this.vendedoresList.slice())
        );
      },
      (error) => {
        const modalInformation: Modal = {
          title: "Error",
          message: "Error al cargar la informacion, verifique su conexion a internet e inténtelo de nuevo",
          type: ModalType.confirmation,
          response: ModalResponse.failed
        }
        this._uiActionsService.openConfirmationDialog(modalInformation);
      }
    )
  }

  getClientes(): void {
    this._usuariosService.getClientes().subscribe(
      (response: Usuario[]) => {
        this.clientesList = response;
        this.filteredClientes = this.clientesCtrl.valueChanges.pipe(
          startWith(''),
          map(cliente => cliente ? this._filterClientes(cliente) : this.clientesList.slice())
        );
      },
      (error) => {
        const modalInformation: Modal = {
          title: "Error",
          message: "Error al cargar la informacion, verifique su conexion a internet e inténtelo de nuevo",
          type: ModalType.confirmation,
          response: ModalResponse.failed
        }
        this._uiActionsService.openConfirmationDialog(modalInformation);
      }
    )
  }

  getCostoTotal(): number {

    let costoTotal = parseFloat(this.superficie.value) * parseFloat(this.costoM2.value);

    if (isNaN(costoTotal))
      costoTotal = 0;

    this.costoTotalTemp = costoTotal;

    return parseFloat(this.costoTotalTemp.toFixed(2));
  }

  getEnganche(): number {

    let enganche: number = this.costoTotalTemp * .10;

    if (isNaN(enganche))
      enganche = 0;

    if (!this.enganche.dirty)
      this.engancheTemp = enganche;
    else
      this.engancheTemp = this.enganche.value;

    return this.engancheTemp;

  }

  getNoMensualidades(): number {

    let noMensualidades = parseInt(this.noMensualidades.value);

    if (isNaN(noMensualidades))
      noMensualidades = 0;

    this.noMensualidadesTemp = noMensualidades;

    return noMensualidades;

  }


  getMontoMensualidad(): number {

    let montoMensualidad: number = (this.costoTotalTemp - this.engancheTemp) / this.noMensualidadesTemp;

    if (isNaN(montoMensualidad) || !isFinite(montoMensualidad))
      montoMensualidad = 0;

    this.montoMensualidadTemp = parseFloat(montoMensualidad.toFixed(2));

    return parseFloat(montoMensualidad.toFixed(2));

  }

  onSetPago(checked: boolean) {

    if (checked) {
      this.pagoAlContado.patchValue(1);
      this.pagoDeContado = true;
    }
    else {
      this.pagoAlContado.patchValue(0);
      this.pagoDeContado = false;
    }

  }

  onSetDeslinde(checked: boolean) {

    if (checked) {

      this.pagoDeslinde.patchValue(1);
      this.deslindePagado = true;

      this.fechaPagoDeslinde.setValidators([Validators.required]);
      this.fechaPagoDeslinde.updateValueAndValidity();

      this.montoDeslinde.setValidators([Validators.required]);
      this.montoDeslinde.updateValueAndValidity();

    }
    else {
      this.pagoDeslinde.patchValue(0);
      this.deslindePagado = false;

      this.fechaPagoDeslinde.setValidators([]);
      this.fechaPagoDeslinde.updateValueAndValidity();

      this.montoDeslinde.setValidators([]);
      this.montoDeslinde.updateValueAndValidity();

    }
  }

  onSubmitForm() {

    //Costo total
    this.costoTotal.patchValue(this.costoTotalTemp);

    //Patch fechas
    this.fechaVenta.patchValue(moment(this.fechaVenta.value).format("DD/MM/YYYY"));

    //Patch temp values
    if (!this.pagoDeContado) {

      this.noMensualidades.patchValue(parseInt(this.noMensualidades.value));
      this.enganche.patchValue(this.engancheTemp);
      this.montoMensualidad.patchValue(this.montoMensualidadTemp);
      this.noMensualidades.patchValue(this.noMensualidadesTemp);

      //Patch integer values
      this.enganche.patchValue(parseFloat(this.enganche.value));

      //Patch fechas
      this.fechaPrimeraMensualidad.patchValue(moment(this.fechaPrimeraMensualidad.value).format("DD/MM/YYYY"));

    } else {
      //Reset values
      this.enganche.patchValue(null);
      this.formaPagoEnganche.patchValue(null);
      this.noMensualidades.patchValue(null);
      this.montoMensualidad.patchValue(null);
      this.diaPagoDel.patchValue(null);
      this.diaPagoAl.patchValue(null);
      this.fechaPrimeraMensualidad.patchValue(null);
    }

    if (this.deslindePagado) {
      this.montoDeslinde.patchValue(parseInt(this.montoDeslinde.value));
      this.fechaPagoDeslinde.patchValue(moment(this.fechaPagoDeslinde.value).format("DD/MM/YYYY"));
    } else {
      this.montoDeslinde.patchValue(null);
      this.fechaPagoDeslinde.patchValue(null);
    }

    //Patch integer values
    this.noManzana.patchValue(parseInt(this.noManzana.value));
    this.noLote.patchValue(parseInt(this.noLote.value));
    this.superficie.patchValue(parseFloat(this.superficie.value));
    this.costoM2.patchValue(parseFloat(this.costoM2.value));

    //Clear vendedores
    this.vendedores.clear();

    //Add vendedores to the form
    this.vendedoresTemp.forEach(element => {
      this.vendedores.push(this.fb.group(element));
    });

    //*********** SALDO ************ /
    if (!this.pagoDeContado) {
      this.saldoFinal = this.costoTotal.value - this.enganche.value;
    } else {
      this.saldoFinal = 0;
    }

    this.saldo.patchValue(this.saldoFinal);

    const dialogRef = this.dialog.open(ConfirmAgregarTerrenoModalComponent, {
      width: '650px',
      data: {
        form: this.terrenoForm.value
      }
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data.action == 'proceed') {
        console.warn('DATA FORM', data.form);
        this._terrenosService.createTerreno(data.form).subscribe(
          (response: any) => {
            console.warn(response);
            if (response) {
              const modalInformation: Modal = {
                title: "Creado",
                message: "El fraccionamiento se creo correctamente",
                type: ModalType.confirmation,
                response: ModalResponse.success
              }
              const dialogRef = this._uiActionsService.openConfirmationDialog(modalInformation);
              dialogRef.afterClosed().subscribe(() => {
                this.router.navigateByUrl('/dashboard/terrenos');
              });
            }
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });

    console.log(this.terrenoForm.value);
  }

}
