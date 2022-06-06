import { Component, OnInit, ViewChild } from '@angular/core';
import { Terreno } from 'src/app/models/terreno';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TerrenosService } from 'src/app/services/terrenos.service';
import { MatDialog } from '@angular/material/dialog';
import { UiActionsService } from 'src/app/services/ui-actions.service';
import { Modal, ModalType, ModalResponse } from 'src/app/models/modal';
import { Router } from '@angular/router';
import { PreviewTerrenoModalComponent } from '../preview-terreno-modal/preview-terreno-modal.component';
import { CambiarEstatusModalComponent } from '../cambiar-estatus-modal/cambiar-estatus-modal.component';
import { Action } from 'src/app/models/action.enum';

@Component({
  selector: 'app-terrenos-view',
  templateUrl: './terrenos-view.component.html',
  styleUrls: ['./terrenos-view.component.scss']
})
export class TerrenosViewComponent implements OnInit {

  /**
   * Displayed columns of the table.
   *
   * @type {string[]}
   * @memberof TerrenosViewComponent
   */
  displayedColumns: string[] = ['noManzana', 'noLote', 'superficie', 'costoM2', 'saldo', 'fraccionamiento', 'cliente', 'estatus', 'acciones'];

  /**
   * Data source of the table.
   *
   * @type {MatTableDataSource<Terreno>}
   * @memberof TerrenosViewComponent
   */
  dataSource: MatTableDataSource<Terreno>;

  /**
   * Paginator of the table.
   *
   * @type {MatPaginator}
   * @memberof TerrenosViewComponent
   */
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * Sort of the table.
   *
   * @type {MatSort}
   * @memberof TerrenosViewComponent
   */
  @ViewChild(MatSort) sort: MatSort;

  /**
   * Creates an instance of TerrenosViewComponent.
   * 
   * @param {TerrenosService} terrenosService
   * @param {MatDialog} dialog
   * @param {UiActionsService} uiActionsService
   * @param {Router} router
   * @memberof TerrenosViewComponent
   */
  constructor(private terrenosService: TerrenosService,
              public dialog: MatDialog,
              private uiActionsService: UiActionsService,
              private router: Router) { }

  /**
   * Angular OnInit life cycle hook.
   *
   * @return {*}  {Promise<void>}
   * @memberof TerrenosViewComponent
   */
  async ngOnInit(): Promise<void> {
    await this.getTerrenos();
  }

  /**
   * Get all the Terrenos.
   *
   * @return {*}  {Promise<void>}
   * @memberof TerrenosViewComponent
   */
  async getTerrenos(): Promise<void> {

    this.uiActionsService.showSpinner();

    try{

      const terrenos: Terreno[] =  await this.terrenosService.getTerrenos().toPromise();

      this.dataSource = new MatTableDataSource(terrenos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

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
   * Views the detail of a Terreno.
   *
   * @param {Terreno} row
   * @memberof TerrenosViewComponent
   */
  onViewTerreno(row: Terreno): void {

    this.dialog.open(PreviewTerrenoModalComponent, {
      width: '600px',
      data: {
        row: row
      }
    });

  }

  /**
   * Change a Status of a Terreno.
   *
   * @param {Terreno} row
   * @memberof TerrenosViewComponent
   */
  onChangeStatus(row: Terreno): void {

    const dialogRef = this.dialog.open(CambiarEstatusModalComponent, {
      width: '500px',
      data: {
        row: row
      }
    });

    dialogRef.afterClosed().subscribe(async (response) => {

      if(response){
        await this.getTerrenos();
      }

    });

  }

  /**
   * Redirects to add or edit a Terreno.
   *
   * @param {string} accion
   * @param {Terreno} [row]
   * @memberof TerrenosViewComponent
   */
  onAgregarEditarTerreno(accion: string, row?: Terreno): void {

    if (accion == Action.CREAR) {
      this.router.navigate(['/dashboard/terrenos/agregar'], { queryParams: { accion: Action.CREAR } });
    } else if (accion == Action.EDITAR) {
      this.router.navigate(['/dashboard/terrenos/editar'], { queryParams: { accion: Action.EDITAR, terreno: row.uuid } });
    }

  }

  /**
   * Deletes a Terreno.
   *
   * @param {Terreno} terreno
   * @return {*}  {Promise<void>}
   * @memberof TerrenosViewComponent
   */
  async onDeleteTerreno(terreno: Terreno): Promise<void> {

    const modalInformation: Modal = {
      title: "¿Estás seguro?",
      message: `Borrarás el terreno #${terreno.noLote} Manzana ${terreno.noManzana} permamentemente, deseas continuar?`,
      type: ModalType.yesno,
      response: ModalResponse.warning
    }

    const dialogRef = this.uiActionsService.openYesNoDialog(modalInformation);

    dialogRef.afterClosed().subscribe(

      async (response) => {

        if (response && response == 'confirm') {

          this.uiActionsService.showSpinner();

          try{

            await this.terrenosService.deleteTerreno(terreno.idTerreno).toPromise();

            const modalInformation: Modal = {
              title: "Eliminado",
              message: `El terreno fue eliminado correctamente`,
              type: ModalType.confirmation,
              response: ModalResponse.success
            }

            const dialogRef = this.uiActionsService.openConfirmationDialog(modalInformation);
            dialogRef.afterClosed().subscribe(async () => await this.getTerrenos());

          }catch{

            const modalInformation: Modal = {
              title: "Error",
              message: "Hubo un error al eliminar el terreno, inténtelo de nuevo.",
              type: ModalType.confirmation,
              response: ModalResponse.failed
            }

            this.uiActionsService.openConfirmationDialog(modalInformation);

          }finally{
            this.uiActionsService.hideSpinner();
          }
        
        }

      }

    );

  }

  /**
   * Redirects to pay de mensualidad.
   *
   * @param {Terreno} terreno
   * @memberof TerrenosViewComponent
   */
  onPayMensualidad(terreno: Terreno): void{
    this.router.navigate(['/dashboard/mensualidades'], { queryParams: { terreno: terreno.uuid } });
  }

  /**
   * Applies the filter.
   *
   * @param {Event} event
   * @memberof TerrenosViewComponent
   */
  applyFilter(event: Event): void {

    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

}
