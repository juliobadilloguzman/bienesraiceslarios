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
import { Action } from 'src/app/models/action.enum';

@Component({
  selector: 'app-agregar-editar-terreno-view',
  templateUrl: './agregar-editar-terreno-view.component.html',
  styleUrls: ['./agregar-editar-terreno-view.component.scss']
})
export class AgregarEditarTerrenoViewComponent implements OnInit {

  /**
   * Action (create or edit)
   *
   * @type {Action}
   * @memberof AgregarEditarTerrenoViewComponent
   */
  accion: Action;

  /**
   * Whole Form.
   *
   * @type {FormGroup}
   * @memberof AgregarEditarTerrenoViewComponent
   */
  terrenoForm: FormGroup;

  /**
   * Check if the terreno is paid de contado.
   *
   * @type {boolean}
   * @memberof AgregarEditarTerrenoViewComponent
   */
  pagoDeContado: boolean = false;

  /**
   * Check if the deslinde is already paid.
   *
   * @type {boolean}
   * @memberof AgregarEditarTerrenoViewComponent
   */
  deslindePagado: boolean = false;

  /**
   * All Fraccionamientos.
   *
   * @type {Fraccionamiento[]}
   * @memberof AgregarEditarTerrenoViewComponent
   */
  fraccionamientos: Fraccionamiento[];

  /**
   * Control for the Vendedores.
   *
   * @type {FormControl}
   * @memberof AgregarEditarTerrenoViewComponent
   */
  vendedoresCtrl: FormControl = new FormControl();

  /**
   * Observable to filter the Vendedores.
   *
   * @type {Observable<Vendedor[]>}
   * @memberof AgregarEditarTerrenoViewComponent
   */
  filteredVendedores: Observable<Vendedor[]>;

  /**
   * Vendedores List.
   *
   * @type {Vendedor[]}
   * @memberof AgregarEditarTerrenoViewComponent
   */
  vendedoresList: Vendedor[];

  /**
   * Temp List Vendedores.
   *
   * @type {Vendedor[]}
   * @memberof AgregarEditarTerrenoViewComponent
   */
  vendedoresTemp: Vendedor[] = [];

  /**
   * Clientes Control.
   *
   * @type {FormControl}
   * @memberof AgregarEditarTerrenoViewComponent
   */
  clientesCtrl: FormControl = new FormControl();

  /**
   * Filtered Clientes.
   *
   * @type {Observable<Usuario[]>}
   * @memberof AgregarEditarTerrenoViewComponent
   */
  filteredClientes: Observable<Usuario[]>;

  /**
   * All Clientes.
   *
   * @type {Usuario[]}
   * @memberof AgregarEditarTerrenoViewComponent
   */
  clientesList: Usuario[];

  /**
   * Current Cliente.
   *
   * @type {Usuario}
   * @memberof AgregarEditarTerrenoViewComponent
   */
  currentCliente: Usuario;

  /**
   * Costo total temp.
   *
   * @type {number}
   * @memberof AgregarEditarTerrenoViewComponent
   */
  costoTotalTemp: number;

  /**
   * Enganche temp.
   *
   * @type {number}
   * @memberof AgregarEditarTerrenoViewComponent
   */
  engancheTemp: number;

  /**
   * Monto mensualidad tmep.
   *
   * @type {number}
   * @memberof AgregarEditarTerrenoViewComponent
   */
  montoMensualidadTemp: number;

  /**
   * No mensualidades temp.
   *
   * @type {number}
   * @memberof AgregarEditarTerrenoViewComponent
   */
  noMensualidadesTemp: number;

  /**
   * Saldo Final.
   *
   * @type {number}
   * @memberof AgregarEditarTerrenoViewComponent
   */
  saldoFinal: number;

  /**
   * Current Terreno if is editing.
   *
   * @type {Terreno}
   * @memberof AgregarEditarTerrenoViewComponent
   */
  terreno: Terreno;

  /**
   * Creates an instance of AgregarEditarTerrenoViewComponent.
   * 
   * @param {FormBuilder} fb
   * @param {TerrenosService} terrenosService
   * @param {FraccionamientosService} fraccionamientosService
   * @param {VendedoresService} vendedoresService
   * @param {UiActionsService} uiActionsService
   * @param {UsuariosService} usuariosService
   * @param {MatDialog} dialog
   * @param {DateAdapter<Date>} dateAdapter
   * @param {Router} router
   * @param {ActivatedRoute} route
   * @memberof AgregarEditarTerrenoViewComponent
   */
  constructor(private fb: FormBuilder,
              private terrenosService: TerrenosService,
              private fraccionamientosService: FraccionamientosService,
              private vendedoresService: VendedoresService,
              private uiActionsService: UiActionsService,
              private usuariosService: UsuariosService,
              public dialog: MatDialog,
              private dateAdapter: DateAdapter<Date>,
              private router: Router,
              private route: ActivatedRoute
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

  /**
   * Gets the idTerreno as FormControl.
   *
   * @readonly
   * @type {FormControl}
   * @memberof AgregarEditarTerrenoViewComponent
   */
  get idTerreno(): FormControl{
    return this.terrenoForm.get('idTerreno') as FormControl;
  }

  /**
   * Gets the noManzana as FormControl.
   *
   * @readonly
   * @type {FormControl}
   * @memberof AgregarEditarTerrenoViewComponent
   */
  get noManzana(): FormControl{
    return this.terrenoForm.get('noManzana') as FormControl;
  }

  /**
   * Gets the noLote as FormControl.
   *
   * @readonly
   * @type {FormControl}
   * @memberof AgregarEditarTerrenoViewComponent
   */
  get noLote(): FormControl{
    return this.terrenoForm.get('noLote') as FormControl;
  }

  get superficie(): FormControl{
    return this.terrenoForm.get('superficie') as FormControl;
  }

  get costoM2(): FormControl{
    return this.terrenoForm.get('costoM2') as FormControl;
  }

  get enganche(): FormControl{
    return this.terrenoForm.get('enganche') as FormControl;
  }

  get formaPagoEnganche(): FormControl{
    return this.terrenoForm.get('formaPagoEnganche') as FormControl;
  }

  get pagoAlContado(): FormControl{
    return this.terrenoForm.get('pagoAlContado') as FormControl;
  }

  get costoTotal(): FormControl{
    return this.terrenoForm.get('costoTotal') as FormControl;
  }

  get saldo(): FormControl{
    return this.terrenoForm.get('saldo') as FormControl;
  }

  get fechaVenta(): FormControl{
    return this.terrenoForm.get('fechaVenta') as FormControl;
  }

  get noMensualidades(): FormControl{
    return this.terrenoForm.get('noMensualidades') as FormControl;
  }

  get montoMensualidad(): FormControl{
    return this.terrenoForm.get('montoMensualidad') as FormControl;
  }

  get diaPagoDel(): FormControl{
    return this.terrenoForm.get('diaPagoDel') as FormControl;
  }

  get diaPagoAl(): FormControl{
    return this.terrenoForm.get('diaPagoAl') as FormControl;
  }

  get pagoDeslinde(): FormControl{
    return this.terrenoForm.get('pagoDeslinde') as FormControl;
  }

  get fechaPagoDeslinde(): FormControl{
    return this.terrenoForm.get('fechaPagoDeslinde') as FormControl;
  }

  get montoDeslinde(): FormControl{
    return this.terrenoForm.get('montoDeslinde') as FormControl;
  }

  get fechaPrimeraMensualidad(): FormControl{
    return this.terrenoForm.get('fechaPrimeraMensualidad') as FormControl;
  }

  get comentariosAdicionales(): FormControl{
    return this.terrenoForm.get('comentariosAdicionales') as FormControl;
  }

  get fraccionamientoIdFraccionamiento(): FormControl{
    return this.terrenoForm.get('fraccionamientoIdFraccionamiento') as FormControl;
  }

  get usuarioIdUsuario(): FormControl{
    return this.terrenoForm.get('usuarioIdUsuario') as FormControl;
  }

  get vendedores(): FormArray{
    return this.terrenoForm.get("vendedores") as FormArray
  }

  /**
   * Angular OnInit life cycle hook.
   *
   * @return {*}  {Promise<void>}
   * @memberof AgregarEditarTerrenoViewComponent
   */
  async ngOnInit(): Promise<void>{

    await this.getFraccionamientos();
    await this.getVendedores();
    await this.getClientes();

    this.accion = this.route.snapshot.queryParams['accion'];

    if (this.route.snapshot.queryParams['terreno']) {

      this.uiActionsService.showSpinner();

      try{

        this.terreno = await this.terrenosService.getTerrenoByUuid(this.route.snapshot.queryParams['terreno']).toPromise();

      }catch{

        const modalInformation: Modal = {
        title: "Error",
        message: "Error al cargar la informacion, verifique su conexion a internet e inténtelo de nuevo",
        type: ModalType.confirmation,
        response: ModalResponse.failed
      }

      this.uiActionsService.openConfirmationDialog(modalInformation);

      }finally{
        this.uiActionsService.hideSpinner();
      }
     
    }

    if (this.accion == Action.EDITAR) {

      this.terrenoForm.patchValue(this.terreno);
      this.fraccionamientoIdFraccionamiento.setValue(this.terreno.fraccionamiento.idFraccionamiento);
      this.usuarioIdUsuario.setValue(this.terreno.usuario.idUsuario);
      this.vendedoresTemp = this.terreno.vendedores;
      this.currentCliente = this.terreno.usuario;

      //Patch Pago al contado
      if (this.terreno.pagoAlContado == 1) {
        this.pagoDeContado = true;
      }

      //Patch Pago deslinde
      if (this.terreno.pagoDeslinde == 1) {
        this.deslindePagado = true;
        this.montoDeslinde.patchValue(this.terreno.montoDeslinde);
      }

    }

  }

  /**
   * Shows the error of the form.
   *
   * @param {FormControl} control
   * @return {*}  {boolean}
   * @memberof AgregarEditarTerrenoViewComponent
   */
  showErrors(control: FormControl): boolean {

    const { dirty, touched, errors } = control;
    return dirty && touched && !!errors;

  }

  /**
   * Filter the Vendedores.
   *
   * @private
   * @param {string} value
   * @return {*}  {Vendedor[]}
   * @memberof AgregarEditarTerrenoViewComponent
   */
  private filterVendedores(value: string): Vendedor[] {

    if (typeof value == "string") {

      const filterValue = value.toLowerCase();
      return this.vendedoresList.filter(vendedor => vendedor.nombre.toLowerCase().indexOf(filterValue) === 0);

    }

  }

  /**
   * Filters the Clientes.
   *
   * @private
   * @param {string} value
   * @return {*}  {Usuario[]}
   * @memberof AgregarEditarTerrenoViewComponent
   */
  private filterClientes(value: string): Usuario[] {

    if (typeof value == "string") {

      const filterValue = value.toLowerCase();
      return this.clientesList.filter(cliente => cliente.nombre.toLowerCase().indexOf(filterValue) === 0);

    }

  }

  /**
   * Opens a modal to add a Vendedor.
   *
   * @memberof AgregarEditarTerrenoViewComponent
   */
  onAgregarVendedor(): void {

    const dialogRef = this.dialog.open(CreateUpdateVendedorModalComponent, {
      width: '70vh',
      maxHeight: '70vh',
      data: {
        accion: 'crear'
      }
    });
    dialogRef.afterClosed().subscribe(async () => await this.getVendedores());

  }

  /**
   * Opens a Modal to add a Cliente.
   *
   * @memberof AgregarEditarTerrenoViewComponent
   */
  onAddCliente(): void {

    const dialogRef = this.dialog.open(CreateUpdateClienteModalComponent, {
      width: '70vh',
      maxHeight: '70vh',
      data: {
        accion: 'crear'
      }
    });

    dialogRef.afterClosed().subscribe(async () => await this.getClientes());

  }

  /**
   * Adds a Cliente
   *
   * @param {*} event
   * @memberof AgregarEditarTerrenoViewComponent
   */
  addCliente(event: any) {

    this.currentCliente = event.option.value;
    this.usuarioIdUsuario.patchValue(this.currentCliente.idUsuario);
    this.clientesCtrl.setValue(null);

  }

  /**
   * Adds a Vendedor.
   *
   * @param {*} event
   * @memberof AgregarEditarTerrenoViewComponent
   */
  addVendedor(event: any) {

    if (this.vendedoresTemp.indexOf(event.option.value) == -1) {

      this.vendedoresTemp.push(event.option.value);
      this.vendedoresCtrl.setValue(null);

    }
    this.vendedoresCtrl.setValue(null);

  }

  /**
   * Removes a vendedor.
   *
   * @param {*} vendedor
   * @memberof AgregarEditarTerrenoViewComponent
   */
  removeVendedor(vendedor: any ) {

    const index = this.vendedoresTemp.indexOf(vendedor);

    if (index >= 0) {
      this.vendedoresTemp.splice(index, 1);
    }

  }

  /**
   * Get all the Fraccionamientos.
   *
   * @return {*}  {Promise<void>}
   * @memberof AgregarEditarTerrenoViewComponent
   */
  async getFraccionamientos(): Promise<void>{

    this.uiActionsService.showSpinner();

    try{

      const fraccionamientos: Fraccionamiento[] = await this.fraccionamientosService.getFraccionamientos().toPromise();

      this.fraccionamientos = fraccionamientos;

    }catch(error){

      const modalInformation: Modal = {
        title: "Error",
        message: "Error al cargar la informacion, verifique su conexion a internet e inténtelo de nuevo",
        type: ModalType.confirmation,
        response: ModalResponse.failed
      }

      this.uiActionsService.openConfirmationDialog(modalInformation);
      
    }finally{
      this.uiActionsService.hideSpinner();
    }

  }

  /**
   * Get all the vendedores.
   *
   * @return {*}  {Promise<void>}
   * @memberof AgregarEditarTerrenoViewComponent
   */
  async getVendedores(): Promise<void> {

    this.uiActionsService.showSpinner();

    try{

      const vendedores: Vendedor[] = await this.vendedoresService.getVendedores().toPromise();

      this.vendedoresList = vendedores;

    }catch(error){

      const modalInformation: Modal = {
        title: "Error",
        message: "Error al cargar la informacion, verifique su conexion a internet e inténtelo de nuevo",
        type: ModalType.confirmation,
        response: ModalResponse.failed
      }

      this.uiActionsService.openConfirmationDialog(modalInformation);

    }finally{
      this.uiActionsService.hideSpinner();
    }

    this.filteredVendedores = this.vendedoresCtrl.valueChanges.pipe(
          startWith(''),
          map(vendedor => vendedor ? this.filterVendedores(vendedor) : this.vendedoresList.slice())
    );

  }

  /**
   * Get all the Clientes.
   *
   * @return {*}  {Promise<void>}
   * @memberof AgregarEditarTerrenoViewComponent
   */
  async getClientes(): Promise<void> {

    this.uiActionsService.showSpinner();

    try{

      const clientes: Usuario[] = await this.usuariosService.getClientes().toPromise();

      this.clientesList = clientes;

    }catch(error){

      const modalInformation: Modal = {
        title: "Error",
        message: "Error al cargar la informacion, verifique su conexion a internet e inténtelo de nuevo",
        type: ModalType.confirmation,
        response: ModalResponse.failed
      }

      this.uiActionsService.openConfirmationDialog(modalInformation);

    }finally{
      this.uiActionsService.hideSpinner();
    }

    this.filteredClientes = this.clientesCtrl.valueChanges.pipe(
      startWith(''),
      map(cliente => cliente ? this.filterClientes(cliente) : this.clientesList.slice())
    );
   
  }

  /**
   * Get the costo total.
   *
   * @return {*}  {number}
   * @memberof AgregarEditarTerrenoViewComponent
   */
  getCostoTotal(): number {

    let costoTotal = parseFloat(this.superficie.value) * parseFloat(this.costoM2.value);

    if (isNaN(costoTotal))
      costoTotal = 0;

    this.costoTotalTemp = costoTotal;

    return parseFloat(this.costoTotalTemp.toFixed(2));

  }

  /**
   * Gets the enganche.
   *
   * @return {*}  {number}
   * @memberof AgregarEditarTerrenoViewComponent
   */
  getEnganche(): number {

    let enganche: number = this.costoTotalTemp * .10;

    if (isNaN(enganche))
      enganche = 0;

    if (this.accion == Action.EDITAR) {
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

  /**
   * Sets the checkbox to change the enganche manually.
   *
   * @param {*} event
   * @memberof AgregarEditarTerrenoViewComponent
   */
  setEngancheManually(event: any) {

    this.engancheTemp = event.target.value;
    this.enganche.patchValue(event.target.value);

  }

  /**
   * Get the number of Mensualidades.
   *
   * @return {*}  {number}
   * @memberof AgregarEditarTerrenoViewComponent
   */
  getNoMensualidades(): number {

    let noMensualidades = parseInt(this.noMensualidades.value);

    if (isNaN(noMensualidades))
      noMensualidades = 0;

    this.noMensualidadesTemp = noMensualidades;

    return noMensualidades;

  }

  /**
   * Gets the monto of the Mensualidad.
   *
   * @return {*}  {number}
   * @memberof AgregarEditarTerrenoViewComponent
   */
  getMontoMensualidad(): number {

    let montoMensualidad: number = (this.costoTotalTemp - this.engancheTemp) / this.noMensualidadesTemp;

    if (isNaN(montoMensualidad) || !isFinite(montoMensualidad))
      montoMensualidad = 0;

    if (this.accion == Action.EDITAR) {
      this.montoMensualidadTemp = this.montoMensualidad.value;
    } else {

      if (!this.montoMensualidad.dirty)
        this.montoMensualidadTemp = parseFloat(montoMensualidad.toFixed(2));
      else {
        this.montoMensualidadTemp = this.montoMensualidad.value;
      }

    }

    return parseFloat(this.montoMensualidadTemp?.toFixed(2));

  }

  /**
   * Sets the Pago.
   *
   * @param {boolean} checked
   * @memberof AgregarEditarTerrenoViewComponent
   */
  onSetPago(checked: boolean): void{

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

    } else {

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

  /**
   * Sets the deslinde and its validaors.
   *
   * @param {boolean} checked
   * @memberof AgregarEditarTerrenoViewComponent
   */
  onSetDeslinde(checked: boolean): void{

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

  /**
   * Sets the monto of each Mensualidad.
   *
   * @param {*} event
   * @memberof AgregarEditarTerrenoViewComponent
   */
  setMontoMensualidad(event: any): void{

    this.montoMensualidadTemp = event.target.value;
    this.montoMensualidad.patchValue(event.target.value);

  }

  /**
   * Submits the form.
   *
   * @return {*}  {Promise<void>}
   * @memberof AgregarEditarTerrenoViewComponent
   */
  async onSubmitForm(): Promise<void>{

    const isDuplicated = await this.terrenosService.isDuplicated({ noManzana: this.noManzana.value, noLote: this.noLote.value, idFraccionamiento: this.fraccionamientoIdFraccionamiento.value }).toPromise();

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
        form: this.terrenoForm.value,
        cliente: this.currentCliente
      }
    });


    dialogRef.afterClosed().subscribe(async (data) => {

      if (data.action == 'proceed') {

        if (this.accion == Action.CREAR) {

          if (isDuplicated) {

            const modalInformation: Modal = {
              title: "TERRENO DUPLICADO",
              message: "El terreno que intentas agregar ya esta vendido, primero debes de cancelar el anterior antes de volverlo a vender. ",
              type: ModalType.confirmation,
              response: ModalResponse.failed
            }

            this.uiActionsService.openConfirmationDialog(modalInformation);

            return;

          }

          this.uiActionsService.showSpinner();

          try{

            await this.terrenosService.createTerreno(data.form).toPromise();

            const modalInformation: Modal = {
              title: "Creado",
              message: "El terreno se creo correctamente",
              type: ModalType.confirmation,
              response: ModalResponse.success
            }

            const dialogRef = this.uiActionsService.openConfirmationDialog(modalInformation);

            dialogRef.afterClosed().subscribe(() => {
              this.router.navigateByUrl('/dashboard/terrenos');
            });

          }catch{

            const modalInformation: Modal = {
              title: "Error",
              message: "Hubo un error al crear el terreno, inténtelo de nuevo o contacte a soporte.",
              type: ModalType.confirmation,
              response: ModalResponse.failed
            }

            this.uiActionsService.openConfirmationDialog(modalInformation);

          }finally{
            this.uiActionsService.hideSpinner();
          }


        } else if (this.accion == Action.EDITAR) {

          try{

            await this.terrenosService.updateTerreno(data.form.idTerreno, data.form).toPromise();

            const modalInformation: Modal = {
              title: "Editado",
              message: "El terreno se editó correctamente",
              type: ModalType.confirmation,
              response: ModalResponse.success
            }

            const dialogRef = this.uiActionsService.openConfirmationDialog(modalInformation);

            dialogRef.afterClosed().subscribe(() => {
              this.router.navigateByUrl('/dashboard/terrenos');
            });

          }catch{

            const modalInformation: Modal = {
              title: "Error",
              message: "Hubo un error al editar el terreno, inténtelo de nuevo o contacte a soporte.",
              type: ModalType.confirmation,
              response: ModalResponse.failed
            }

            this.uiActionsService.openConfirmationDialog(modalInformation);

          }finally{
            this.uiActionsService.hideSpinner();
          }
  
        }

      }

    });

  }

}
