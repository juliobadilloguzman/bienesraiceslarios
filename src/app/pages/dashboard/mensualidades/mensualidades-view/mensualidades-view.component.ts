import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Terreno } from 'src/app/models/terreno';
import { Mensualidad } from 'src/app/models/mensualidad';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MensualidadesService } from 'src/app/services/mensualidades.service';
import { MatDialog } from '@angular/material/dialog';
import { UiActionsService } from 'src/app/services/ui-actions.service';
import { Modal, ModalType, ModalResponse } from 'src/app/models/modal';
import { PreviewMensualidadModalComponent } from '../preview-mensualidad-modal/preview-mensualidad-modal.component';
import { CreateUpdateMensualidadModalComponent } from '../create-update-mensualidad-modal/create-update-mensualidad-modal.component';
import { DownloadService } from 'src/app/services/download.service';
import { CurrencyPipe } from '@angular/common';
import { TerrenosService } from 'src/app/services/terrenos.service';

@Component({
  selector: 'app-mensualidades-view',
  templateUrl: './mensualidades-view.component.html',
  styleUrls: ['./mensualidades-view.component.scss']
})
export class MensualidadesViewComponent implements OnInit {

  /**
   * Current Terreno.
   *
   * @type {Terreno}
   * @memberof MensualidadesViewComponent
   */
  terreno: Terreno;

  /**
   * All Mensualidades.
   *
   * @type {Mensualidad[]}
   * @memberof MensualidadesViewComponent
   */
  mensualidades: Mensualidad[];

  /**
   * Columns of the table.
   *
   * @type {string[]}
   * @memberof MensualidadesViewComponent
   */
  displayedColumns: string[] = ['numeroMensualidad', 'fechaPago', 'monto', 'mes', 'year', 'interes', 'estatusMensualidad', 'acciones'];

  /**
   * Data Source of the table.
   *
   * @type {MatTableDataSource<Mensualidad>}
   * @memberof MensualidadesViewComponent
   */
  dataSource: MatTableDataSource<Mensualidad>;

  /**
   * Paginator of the table.
   *
   * @type {MatPaginator}
   * @memberof MensualidadesViewComponent
   */
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * Sort of the table.
   *
   * @type {MatSort}
   * @memberof MensualidadesViewComponent
   */
  @ViewChild(MatSort) sort: MatSort;

  /**
   * Creates an instance of MensualidadesViewComponent.
   * 
   * @param {ActivatedRoute} route
   * @param {MensualidadesService} mensualidadesService
   * @param {MatDialog} dialog
   * @param {UiActionsService} uiActionsService
   * @param {DownloadService} downloadService
   * @param {CurrencyPipe} currencyPipe
   * @param {TerrenosService} terrenosService
   * @memberof MensualidadesViewComponent
   */
  constructor(public route: ActivatedRoute,
              private mensualidadesService: MensualidadesService,
              public dialog: MatDialog,
              private uiActionsService: UiActionsService,
              private downloadService: DownloadService,
              private currencyPipe: CurrencyPipe,
              private terrenosService: TerrenosService) { }

  /**
   * Angular OnInit life cycle hook.
   *
   * @return {*}  {Promise<void>}
   * @memberof MensualidadesViewComponent
   */
  async ngOnInit(): Promise<void> {

    if(this.route.snapshot.queryParams['terreno']){
      await this.getTerreno(this.route.snapshot.queryParams['terreno']);
    }

    await this.getMensualidades();

  }

  /**
   * Gets the terreno.
   *
   * @param {string} uuid
   * @return {*}  {Promise<void>}
   * @memberof MensualidadesViewComponent
   */
  async getTerreno(uuid: string): Promise<void>{

    this.uiActionsService.showSpinner();

    try{

      this.terreno = await this.terrenosService.getTerrenoByUuid(uuid).toPromise();
      
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

  /**
   * Get all the mensualidades.
   *
   * @return {*}  {Promise<void>}
   * @memberof MensualidadesViewComponent
   */
  async getMensualidades(): Promise<void> {

    this.uiActionsService.showSpinner();

    try{

      this.mensualidades = await this.mensualidadesService.getMensualidadesFromTerreno(this.terreno.idTerreno).toPromise();

      this.dataSource = new MatTableDataSource(this.mensualidades);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
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

  /**
   * Get the interes.
   *
   * @param {Mensualidad} mensualidad
   * @return {*}  {string}
   * @memberof MensualidadesViewComponent
   */
  getInteresTable(mensualidad: Mensualidad): string{

    if (mensualidad.interes == null) {
      return this.currencyPipe.transform(0);
    } else {

      if (mensualidad.estatusInteres == 'PAGADO') {
        return `${this.currencyPipe.transform(mensualidad.interes)}`
      } else if (mensualidad.estatusInteres == 'NO PAGADO') {
        return `${this.currencyPipe.transform(mensualidad.interes)}`
      }

    }

  }

  /**
   * Views the Mensualidad.
   *
   * @param {Mensualidad} row
   * @memberof MensualidadesViewComponent
   */
  onViewMensualidad(row: Mensualidad): void {

    this.dialog.open(PreviewMensualidadModalComponent, {
      width: '600px',
      data: {
        row: row
      }
    });

  }

  /**
   * Opens a modal to add or edit a Mensualidad.
   *
   * @param {string} accion
   * @param {Mensualidad} [row]
   * @memberof MensualidadesViewComponent
   */
  onAgregarEditarMensualidad(accion: string, row?: Mensualidad): void {

    const dialogRef = this.dialog.open(CreateUpdateMensualidadModalComponent, {
      width: '600px',
      data: {
        accion: accion,
        row: row,
        idTerreno: this.terreno.idTerreno,
        montoMensualidad: this.terreno.montoMensualidad
      }
    });

    dialogRef.afterClosed().subscribe(async () => await this.ngOnInit());
    
  }

  /**
   * Deletes a Mensualidad.
   *
   * @param {Mensualidad} mensualidad
   * @memberof MensualidadesViewComponent
   */
  onDeleteMensualidad(mensualidad: Mensualidad): void {

    const modalInformation: Modal = {
      title: "¿Estás seguro?",
      message: `El monto de la mensualidad y el interes (si tiene) se sumarán al saldo del terreno, deseas continuar?`,
      type: ModalType.yesno,
      response: ModalResponse.warning
    }

    const dialogRef = this.uiActionsService.openYesNoDialog(modalInformation);

    dialogRef.afterClosed().subscribe(async (response) => {

      if (response && response == 'confirm') {

        this.uiActionsService.showSpinner();

        try{

          await this.mensualidadesService.deleteMensualidad(mensualidad.idMensualidad).toPromise();

          const modalInformation: Modal = {
            title: "Eliminada",
            message: `La mensualidad se ha eliminado correctamente`,
            type: ModalType.confirmation,
            response: ModalResponse.success
          }

          const dialogRef = this.uiActionsService.openConfirmationDialog(modalInformation);
          dialogRef.afterClosed().subscribe(async () => await this.ngOnInit());

        }catch{

          const modalInformation: Modal = {
            title: "Error",
            message: "Hubo un error al eliminar la mensualidad, inténtelo de nuevo.",
            type: ModalType.confirmation,
            response: ModalResponse.failed
          }

          this.uiActionsService.openConfirmationDialog(modalInformation);
          
        }finally{
          this.uiActionsService.hideSpinner();
        }

      }

    });

  }

  /**
   * Generates the PDF.
   *
   * @memberof MensualidadesViewComponent
   */
  generarReporte(): void {
    this.downloadService.generateEstadoCuentaPdf(this.mensualidades, this.terreno);
  }

  /**
   * Apply the filter to the table.
   *
   * @param {Event} event
   * @memberof MensualidadesViewComponent
   */
  applyFilter(event: Event): void {

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    
  }

}
