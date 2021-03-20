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

@Component({
  selector: 'app-terrenos-view',
  templateUrl: './terrenos-view.component.html',
  styleUrls: ['./terrenos-view.component.scss']
})
export class TerrenosViewComponent implements OnInit {

  displayedColumns: string[] = ['noManzana', 'noLote', 'superficie', 'costoM2', 'saldo', 'fraccionamiento', 'cliente', 'estatus', 'acciones'];
  dataSource: MatTableDataSource<Terreno>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _terrenosService: TerrenosService,
    public dialog: MatDialog,
    private _uiActionsService: UiActionsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getTerrenos();
  }

  getTerrenos(): void {

    this._uiActionsService.showSpinner();

    this._terrenosService.getTerrenos().subscribe(

      (response: Terreno[]) => {

        if (response) {

          this._uiActionsService.hideSpinner();

          this.dataSource = new MatTableDataSource(response);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;


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
    );
  }

  onViewTerreno(row: Terreno): void {

    this.dialog.open(PreviewTerrenoModalComponent, {
      width: '600px',
      data: {
        row: row
      }
    });

  }

  onChangeStatus(row: Terreno): void {

    const dialogRef = this.dialog.open(CambiarEstatusModalComponent, {
      width: '500px',
      data: {
        row: row
      }
    });

    dialogRef.afterClosed().subscribe((response) => {

      if(response){
        this.getTerrenos();
      }

    });

  }


  onAgregarEditarTerreno(accion: string, row?: Terreno): void {

    if (accion == 'agregar') {
      this.router.navigateByUrl('/dashboard/terrenos/agregar', { state: { accion: 'agregar' } });
    } else if (accion == 'editar') {
      this.router.navigateByUrl('/dashboard/terrenos/editar', { state: { accion: 'editar', row: row } });
    }

  }

  onDeleteTerreno(terreno: Terreno) {

    const modalInformation: Modal = {
      title: "¿Estás seguro?",
      message: `Borrarás el terreno #${terreno.noLote} Manzana ${terreno.noManzana} permamentemente, deseas continuar?`,
      type: ModalType.yesno,
      response: ModalResponse.warning
    }

    const dialogRef = this._uiActionsService.openYesNoDialog(modalInformation);

    dialogRef.afterClosed().subscribe(

      (response) => {

        if (response && response == 'confirm') {

          this._uiActionsService.showSpinner();

          this._terrenosService.deleteTerreno(terreno.idTerreno).subscribe(

            (response: any) => {

              this._uiActionsService.hideSpinner();

              const modalInformation: Modal = {
                title: "Eliminado",
                message: `El terreno fue eliminado correctamente`,
                type: ModalType.confirmation,
                response: ModalResponse.success
              }

              const dialogRef = this._uiActionsService.openConfirmationDialog(modalInformation);
              dialogRef.afterClosed().subscribe(() => this.getTerrenos());

            },

            (error) => {

              this._uiActionsService.hideSpinner();

              const modalInformation: Modal = {
                title: "Error",
                message: "Hubo un error al eliminar el terreno, inténtelo de nuevo.",
                type: ModalType.confirmation,
                response: ModalResponse.failed
              }

              this._uiActionsService.openConfirmationDialog(modalInformation);

            }
          )
        }

      },
    );

  }


  onPayMensualidad(terreno: Terreno) {
    this.router.navigateByUrl('/dashboard/mensualidades', { state: { terreno: terreno } });
  }

  applyFilter(event: Event): void {

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

}
