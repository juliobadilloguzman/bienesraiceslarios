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
import { Router, ActivatedRoute } from '@angular/router';
import { Terreno } from 'src/app/models/terreno';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-agregar-editar-terreno-view',
  templateUrl: './agregar-editar-terreno-view.component.html',
  styleUrls: ['./agregar-editar-terreno-view.component.scss']
})
export class AgregarEditarTerrenoViewComponent implements OnInit {

  //State to accion
  state$: Observable<object>;
  accion: string;

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
  terreno: Terreno;

  constructor(
    private fb: FormBuilder,
    private _terrenosService: TerrenosService,
    private _fraccionamientosService: FraccionamientosService,
    private _vendedoresService: VendedoresService,
    private _uiActionsService: UiActionsService,
    private _usuariosService: UsuariosService,
    public dialog: MatDialog,
    private dateAdapter: DateAdapter<Date>,
    private router: Router,
    private route: ActivatedRoute,
  ) {

    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy

    this.terrenoForm = this.fb.group({
      idTerreno: [],
      noManzana: [null, [Validators.required, Validators.pattern(/^\d+$/), Validators.min(1)]],
      noLote: [null, [Validators.required, Validators.pattern(/^\d+$/), Validators.min(1)]],
      superficie: [null, [Validators.required, Validators.pattern(/^-?\d+\.?\d*$/), Validators.min(1)]],
      costoM2: [null, [Validators.required, Validators.pattern(/^-?\d+\.?\d*$/), Validators.min(1)]],
      enganche: [null],
      formaPagoEnganche: [null, [Validators.required]],
      pagoAlContado: [0, [Validators.required]],
      costoTotal: [0, [Validators.required]],
      saldo: [],
      fechaVenta: [moment().format('L'), [Validators.required]],
      noMensualidades: [null, [Validators.required]],
      montoMensualidad: [],
      diaPagoDel: [null, [Validators.required]],
      diaPagoAl: [null, [Validators.required]],
      pagoDeslinde: [0],
      fechaPagoDeslinde: [moment().format('L')],
      montoDeslinde: [null],
      fechaPrimeraMensualidad: [moment().format('L'), [Validators.required]],
      comentariosAdicionales: [],
      fraccionamientoIdFraccionamiento: [null, [Validators.required]],
      usuarioIdUsuario: [null, [Validators.required]],
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

    //Get the action and the terreno
    this.state$ = this.route.paramMap.pipe(map(() => window.history.state));
    this.state$.subscribe(response => {

      this.accion = response['accion'];

      if (response['row']) {
        this.terreno = response['row'];
      }

    });

    if (!this.accion) {
      this.router.navigateByUrl('/dashboard/terrenos');
      return;
    }

    if (this.accion == 'editar') {

      if (!this.terreno) {

        const modalInformation: Modal = {
          title: "Error",
          message: "Debe de seleccionar el terreno a editar desde la tabla de terrenos",
          type: ModalType.confirmation,
          response: ModalResponse.failed
        }

        const dialogRef = this._uiActionsService.openConfirmationDialog(modalInformation);
        dialogRef.afterClosed().subscribe(() => {
          this.router.navigateByUrl('/dashboard/terrenos');
        });

      } else {

        this.terrenoForm.patchValue(this.terreno);
        this.fraccionamientoIdFraccionamiento.setValue(this.terreno.fraccionamiento.idFraccionamiento);
        this.usuarioIdUsuario.setValue(this.terreno.usuario.idUsuario);
        this.vendedoresTemp = this.terreno.vendedores;
        this.clienteTemp = this.terreno.usuario;

        //Patch Pago al contado
        if (this.terreno.pagoAlContado == 1) {
          this.pagoDeContado = true;
        }

        //Patch Pago deslinde
        if (this.terreno.pagoDeslinde == 1) {
          this.deslindePagado = true;
          //this.fechaPagoDeslinde.patchValue(new Date(this.terreno.fechaPagoDeslinde));
          this.montoDeslinde.patchValue(this.terreno.montoDeslinde);
        }
      }

    }

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

    this._uiActionsService.showSpinner();

    this._fraccionamientosService.getFraccionamientos().subscribe(
      (response: Fraccionamiento[]) => {

        if (response) {

          this.fraccionamientos = response;
          this._uiActionsService.hideSpinner();

        } else {

          this._uiActionsService.hideSpinner();

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

        this._uiActionsService.hideSpinner();

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

    this._uiActionsService.showSpinner();

    this._vendedoresService.getVendedores().subscribe(
      (response: Vendedor[]) => {

        this.vendedoresList = response;

        this._uiActionsService.hideSpinner();

        this.filteredVendedores = this.vendedoresCtrl.valueChanges.pipe(
          startWith(''),
          map(vendedor => vendedor ? this._filterVendedores(vendedor) : this.vendedoresList.slice())
        );

      },
      (error) => {

        this._uiActionsService.hideSpinner();

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

    this._uiActionsService.showSpinner();

    this._usuariosService.getClientes().subscribe(

      (response: Usuario[]) => {

        this.clientesList = response;

        this._uiActionsService.hideSpinner();

        this.filteredClientes = this.clientesCtrl.valueChanges.pipe(
          startWith(''),
          map(cliente => cliente ? this._filterClientes(cliente) : this.clientesList.slice())
        );

      },

      (error) => {

        this._uiActionsService.hideSpinner();

        const modalInformation: Modal = {
          title: "Error",
          message: "Error al cargar la informacion, verifique su conexion a internet e inténtelo de nuevo",
          type: ModalType.confirmation,
          response: ModalResponse.failed
        }

        this._uiActionsService.openConfirmationDialog(modalInformation);

      }
    );

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


    // if (this.accion == 'editar') {
    //   this.engancheTemp = this.terreno.enganche;
    // } else {

    //   if (!this.enganche.dirty)
    //     this.engancheTemp = enganche;
    //   else {
    //     this.engancheTemp = this.enganche.value;
    //   }

    // }

    if (this.accion == 'editar') {
      this.engancheTemp = this.enganche.value;
    } else {

      if (!this.enganche.dirty)
        this.engancheTemp = enganche;
      else {
        this.engancheTemp = this.enganche.value;
      }

    }

    return this.engancheTemp;

  }

  setEngancheManually(event: any) {
    this.engancheTemp = event.target.value;
    this.enganche.patchValue(event.target.value);
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

    if (this.accion == 'editar') {
      this.montoMensualidadTemp = this.montoMensualidad.value;
    } else {

      if (!this.montoMensualidad.dirty)
        this.montoMensualidadTemp = parseFloat(montoMensualidad.toFixed(2));
      else {
        this.montoMensualidadTemp = this.montoMensualidad.value;
      }

    }

    return parseFloat(this.montoMensualidadTemp.toFixed(2));

  }

  onSetPago(checked: boolean) {

    if (checked) {

      this.pagoAlContado.patchValue(1);
      this.pagoDeContado = true;

      //Remove validators
      this.enganche.clearValidators()
      this.enganche.updateValueAndValidity();

      this.formaPagoEnganche.clearValidators()
      this.formaPagoEnganche.updateValueAndValidity();

      this.noMensualidades.clearValidators()
      this.noMensualidades.updateValueAndValidity();

      this.montoMensualidad.clearValidators()
      this.montoMensualidad.updateValueAndValidity();

      this.diaPagoDel.clearValidators()
      this.diaPagoDel.updateValueAndValidity();

      this.diaPagoAl.clearValidators()
      this.diaPagoAl.updateValueAndValidity();

      this.fechaPrimeraMensualidad.clearValidators();
      this.fechaPrimeraMensualidad.updateValueAndValidity();

    }
    else {

      this.pagoAlContado.patchValue(0);
      this.pagoDeContado = false;

      //Update validators

      this.formaPagoEnganche.setValidators([Validators.required]);
      this.formaPagoEnganche.updateValueAndValidity();

      this.noMensualidades.setValidators([Validators.required]);
      this.noMensualidades.updateValueAndValidity();


      this.diaPagoDel.setValidators([Validators.required]);
      this.diaPagoDel.updateValueAndValidity();

      this.diaPagoAl.setValidators([Validators.required]);
      this.diaPagoAl.updateValueAndValidity();

      this.fechaPrimeraMensualidad.setValidators([Validators.required]);
      this.fechaPrimeraMensualidad.updateValueAndValidity();

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

  setMontoMensualidad(event: any) {

    this.montoMensualidadTemp = event.target.value;
    this.montoMensualidad.patchValue(event.target.value);

  }

  async onSubmitForm() {

    const isDuplicated = await this._terrenosService.isDuplicated({ noManzana: this.noManzana.value, noLote: this.noLote.value, idFraccionamiento: this.fraccionamientoIdFraccionamiento.value });

    //Costo total
    this.costoTotal.patchValue(this.costoTotalTemp);

    //Patch temp values
    if (!this.pagoDeContado) {

      this.noMensualidades.patchValue(parseInt(this.noMensualidades.value));
      this.enganche.patchValue(this.engancheTemp);
      this.montoMensualidad.patchValue(this.montoMensualidadTemp);
      this.noMensualidades.patchValue(this.noMensualidadesTemp);

      //Patch integer values
      this.enganche.patchValue(parseFloat(this.enganche.value));

      //Patch fechas
      this.fechaPrimeraMensualidad.patchValue(moment(this.fechaPrimeraMensualidad.value).format("YYYY-MM-DD"));

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
      this.fechaPagoDeslinde.patchValue(moment(this.fechaPagoDeslinde.value).format("YYYY-MM-DD"));
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
      this.saldoFinal = this.costoTotal.value;
    }

    this.saldo.patchValue(this.saldoFinal);

    const dialogRef = this.dialog.open(ConfirmAgregarTerrenoModalComponent, {
      width: '650px',
      height: '70vh',
      disableClose: true,
      data: {
        form: this.terrenoForm.value
      }
    });

    dialogRef.afterClosed().subscribe(data => {

      if (data.action == 'proceed') {

        this._uiActionsService.showSpinner();

        if (this.accion == 'agregar') {

          if (isDuplicated) {

            this._uiActionsService.hideSpinner();

            const modalInformation: Modal = {
              title: "TERRENO DUPLICADO",
              message: "El terreno que intentas agregar ya esta vendido, primero debes de cancelar el anterior antes de volverlo a vender. ",
              type: ModalType.confirmation,
              response: ModalResponse.failed
            }

            this._uiActionsService.openConfirmationDialog(modalInformation);

            return;

          }

          this._terrenosService.createTerreno(data.form).subscribe(
            (response: any) => {

              if (response) {

                this._uiActionsService.hideSpinner();

                const modalInformation: Modal = {
                  title: "Creado",
                  message: "El terreno se creo correctamente",
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

              this._uiActionsService.hideSpinner();

              const modalInformation: Modal = {
                title: "Error",
                message: "Hubo un error al crear el terreno, inténtelo de nuevo o contacte a soporte.",
                type: ModalType.confirmation,
                response: ModalResponse.failed
              }

              this._uiActionsService.openConfirmationDialog(modalInformation);

            }
          );


        } else if (this.accion == 'editar') {



          this._terrenosService.updateTerreno(data.form.idTerreno, data.form).subscribe(
            (response: any) => {

              if (response) {

                this._uiActionsService.hideSpinner();

                const modalInformation: Modal = {
                  title: "Editado",
                  message: "El terreno se editó correctamente",
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

              this._uiActionsService.hideSpinner();

              const modalInformation: Modal = {
                title: "Error",
                message: "Hubo un error al editar el terreno, inténtelo de nuevo o contacte a soporte.",
                type: ModalType.confirmation,
                response: ModalResponse.failed
              }

              this._uiActionsService.openConfirmationDialog(modalInformation);

            }
          );

        }

      }
    });


  }

}
