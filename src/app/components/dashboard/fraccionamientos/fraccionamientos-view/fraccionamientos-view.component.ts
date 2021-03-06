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
import { AuthService } from 'src/app/services/auth.service';
import { from } from 'rxjs';
import { Account } from 'src/app/models/account';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-fraccionamientos-view',
  templateUrl: './fraccionamientos-view.component.html',
  styleUrls: ['./fraccionamientos-view.component.scss']
})
export class FraccionamientosViewComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'regimen', 'acciones'];
  dataSource: MatTableDataSource<Fraccionamiento>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _fraccionamientoService: FraccionamientosService,
    public dialog: MatDialog,
    private _uiActionsService: UiActionsService,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getFraccionamientos();
  }

  getFraccionamientos(): void {
    this._fraccionamientoService.getFraccionamientos().subscribe(
      (response: Fraccionamiento[]) => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
    );
  }

  onViewFraccionamiento(row: Fraccionamiento): void {
    this.dialog.open(PreviewFraccionamientoModalComponent, {
      width: '600px',
      data: {
        row: row
      }
    });
  }

  onAgregarEditarFraccionamiento(accion: string, row?: Fraccionamiento): void {
    const dialogRef = this.dialog.open(CreateUpdateFraccionamientoModalComponent, {
      width: '600px',
      data: {
        accion: accion,
        row: row
      }
    });
    dialogRef.afterClosed().subscribe(() => this.getFraccionamientos());
  }

  onDeleteFraccionamiento(fraccionamiento: Fraccionamiento) {

    const modalInformation: Modal = {
      title: "¿Estás seguro?",
      message: `Borrarás al fraccionamiento "${fraccionamiento.nombre} permamentemente, deseas continuar?`,
      type: ModalType.yesno,
      response: ModalResponse.warning
    }

    const dialogRef = this._uiActionsService.openYesNoDialog(modalInformation);

    dialogRef.afterClosed().subscribe((response) => {

      if (response && response == 'confirm') {
        this._fraccionamientoService.deleteFraccionamiento(fraccionamiento.idFraccionamiento).subscribe(
          (response: any) => {
            const modalInformation: Modal = {
              title: "Eliminado",
              message: `El fraccionamiento "${fraccionamiento.nombre} fue eliminado correctamente`,
              type: ModalType.confirmation,
              response: ModalResponse.success
            }
            const dialogRef = this._uiActionsService.openConfirmationDialog(modalInformation);
            dialogRef.afterClosed().subscribe(() => this.getFraccionamientos());
          },
          (error) => {
            const modalInformation: Modal = {
              title: "Error",
              message: "Hubo un error al eliminar el fraccionamiento, inténtelo de nuevo.",
              type: ModalType.confirmation,
              response: ModalResponse.failed
            }
            this._uiActionsService.openConfirmationDialog(modalInformation);
          }
        )
      }

    });

  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
