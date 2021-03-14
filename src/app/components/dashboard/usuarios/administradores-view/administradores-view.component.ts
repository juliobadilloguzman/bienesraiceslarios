import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from 'src/app/models/usuario';
import { Modal, ModalType, ModalResponse } from 'src/app/models/modal';
import { UiActionsService } from 'src/app/services/ui-actions.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { PreviewAdministradorModalComponent } from './preview-administrador-modal/preview-administrador-modal.component';
import { CreateUpdateAdministradorModalComponent } from './create-update-administrador-modal/create-update-administrador-modal.component';

@Component({
  selector: 'app-administradores-view',
  templateUrl: './administradores-view.component.html',
  styleUrls: ['./administradores-view.component.scss']
})
export class AdministradoresViewComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'apellidoPaterno', 'apellidoMaterno', 'correo', 'acciones'];
  dataSource: MatTableDataSource<Usuario>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _usuariosService: UsuariosService,
    private dialog: MatDialog,
    private _uiActionsService: UiActionsService
  ) { }

  ngOnInit(): void {
    this.getAdministradores();
  }

  getAdministradores(): void {

    this._uiActionsService.showSpinner();

    this._usuariosService.getAdministradores().subscribe(

      (response: Usuario[]) => {

        if (response) {

          this._uiActionsService.hideSpinner();

          this.dataSource = new MatTableDataSource(response);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

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

  onViewAdministrador(row: Usuario): void {

    this.dialog.open(PreviewAdministradorModalComponent, {
      width: '600px',
      data: {
        row: row
      }
    });

  }

  onAgregarEditarAdministrador(accion: string, row?: Usuario): void {

    const dialogRef = this.dialog.open(CreateUpdateAdministradorModalComponent, {
      width: '600px',
      data: {
        accion: accion,
        row: row
      }
    });

    dialogRef.afterClosed().subscribe(() => this.getAdministradores());

  }

  onDeleteAdministrador(administrador: Usuario) {
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
