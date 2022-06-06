import { Component, OnInit, ViewChild } from '@angular/core';
import { Fraccionamiento } from 'src/app/models/fraccionamiento';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FraccionamientosService } from 'src/app/services/fraccionamientos.service';
import { MatDialog } from '@angular/material/dialog';
import { UiActionsService } from 'src/app/services/ui-actions.service';
import { Modal, ModalType, ModalResponse } from 'src/app/models/modal';
import { PreviewFraccionamientoModalComponent } from '../preview-fraccionamiento-modal/preview-fraccionamiento-modal.component';
import { CreateUpdateFraccionamientoModalComponent } from '../create-update-fraccionamiento-modal/create-update-fraccionamiento-modal.component';

@Component({
  selector: 'app-fraccionamientos-view',
  templateUrl: './fraccionamientos-view.component.html',
  styleUrls: ['./fraccionamientos-view.component.scss']
})
export class FraccionamientosViewComponent implements OnInit {

  /**
   * Columns of the Table,
   *
   * @type {string[]}
   * @memberof FraccionamientosViewComponent
   */
  displayedColumns: string[] = ['nombre', 'regimen', 'acciones'];

  /**
   * Data Source of the table.
   *
   * @type {MatTableDataSource<Fraccionamiento>}
   * @memberof FraccionamientosViewComponent
   */
  dataSource: MatTableDataSource<Fraccionamiento>;

  /**
   * Paginator of the table.
   *
   * @type {MatPaginator}
   * @memberof FraccionamientosViewComponent
   */
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * Sort of the table.
   *
   * @type {MatSort}
   * @memberof FraccionamientosViewComponent
   */
  @ViewChild(MatSort) sort: MatSort;

  /**
   * Creates an instance of FraccionamientosViewComponent.
   * 
   * @param {FraccionamientosService} _fraccionamientoService
   * @param {MatDialog} dialog
   * @param {UiActionsService} _uiActionsService
   * @memberof FraccionamientosViewComponent
   */
  constructor(private _fraccionamientoService: FraccionamientosService,
              public dialog: MatDialog,
              private _uiActionsService: UiActionsService) { }

  /**
   * Angular OnInit life cycle hook.
   *
   * @return {*}  {Promise<void>}
   * @memberof FraccionamientosViewComponent
   */
  async ngOnInit(): Promise<void> {
    await this.getFraccionamientos();
  }

  /**
   * Get all the Fraccionamientos.
   *
   * @return {*}  {Promise<void>}
   * @memberof FraccionamientosViewComponent
   */
  async getFraccionamientos(): Promise<void> {

    this._uiActionsService.showSpinner();

    try{

      let fraccionamientos: Fraccionamiento[] = await this._fraccionamientoService.getFraccionamientos().toPromise();

      this.dataSource = new MatTableDataSource(fraccionamientos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    }catch(error){

      const modalInformation: Modal = {
        title: "Error",
        message: "Error al cargar la informacion, verifique su conexion a internet e inténtelo de nuevo",
        type: ModalType.confirmation,
        response: ModalResponse.failed
      }

      this._uiActionsService.openConfirmationDialog(modalInformation);

    }finally{
      this._uiActionsService.hideSpinner();
    }

  }

  /**
   * View the detail of the Fraccionamiento.
   *
   * @param {Fraccionamiento} row
   * @memberof FraccionamientosViewComponent
   */
  onViewFraccionamiento(row: Fraccionamiento): void {

    this.dialog.open(PreviewFraccionamientoModalComponent, {
      width: '600px',
      data: {
        row: row
      }
    });

  }

  /**
   * Edit or create a fraccionamiento.
   *
   * @param {string} accion
   * @param {Fraccionamiento} [row]
   * @memberof FraccionamientosViewComponent
   */
  onAgregarEditarFraccionamiento(accion: string, row?: Fraccionamiento): void {

    const dialogRef = this.dialog.open(CreateUpdateFraccionamientoModalComponent, {
      width: '600px',
      data: {
        accion: accion,
        fraccionamiento: row
      }
    });

    dialogRef.afterClosed().subscribe(() => this.getFraccionamientos());

  }

  /**
   * Deletes the fraccionamiento.
   *
   * @param {Fraccionamiento} fraccionamiento
   * @memberof FraccionamientosViewComponent
   */
  onDeleteFraccionamiento(fraccionamiento: Fraccionamiento) {

    const modalInformation: Modal = {
      title: "¿Estás seguro?",
      message: `Borrarás al fraccionamiento "${fraccionamiento.nombre} permamentemente, deseas continuar?`,
      type: ModalType.yesno,
      response: ModalResponse.warning
    }

    const dialogRef = this._uiActionsService.openYesNoDialog(modalInformation);

    dialogRef.afterClosed().subscribe(async (response) => {

      if (response && response == 'confirm') {

        this._uiActionsService.showSpinner();

        try{

          await this._fraccionamientoService.deleteFraccionamiento(fraccionamiento.idFraccionamiento).toPromise();

          const modalInformation: Modal = {
            title: "Eliminado",
            message: `El fraccionamiento "${fraccionamiento.nombre} fue eliminado correctamente`,
            type: ModalType.confirmation,
            response: ModalResponse.success
          }

          const dialogRef = this._uiActionsService.openConfirmationDialog(modalInformation);

          dialogRef.afterClosed().subscribe(async () => await this.getFraccionamientos());

        }catch(error){

          const modalInformation: Modal = {
            title: "Error",
            message: "Hubo un error al eliminar el fraccionamiento, inténtelo de nuevo.",
            type: ModalType.confirmation,
            response: ModalResponse.failed
          }
          this._uiActionsService.openConfirmationDialog(modalInformation);
          
        }finally{
          this._uiActionsService.hideSpinner();
        }

      }

    });

  }

  /**
   * Applies the filter to the table.
   *
   * @param {Event} event
   * @memberof FraccionamientosViewComponent
   */
  applyFilter(event: Event): void {

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

}
