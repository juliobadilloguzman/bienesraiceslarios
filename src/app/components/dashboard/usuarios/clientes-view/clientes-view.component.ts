import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from 'src/app/models/usuario';
import { Modal, ModalType, ModalResponse } from 'src/app/models/modal';
import { UiActionsService } from 'src/app/services/ui-actions.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { PreviewClienteModalComponent } from './preview-cliente-modal/preview-cliente-modal.component';
import { CreateUpdateClienteModalComponent } from './create-update-cliente-modal/create-update-cliente-modal.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-clientes-view',
  templateUrl: './clientes-view.component.html',
  styleUrls: ['./clientes-view.component.scss']
})
export class ClientesViewComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'apellidoPaterno', 'apellidoMaterno', 'correo', 'acciones'];
  dataSource: MatTableDataSource<Usuario>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _usuariosService: UsuariosService,
    private dialog: MatDialog,
    private _uiActionsService: UiActionsService,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getClientes();
  }

  getClientes(): void {
    this._usuariosService.getClientes().subscribe(
      (response: Usuario[]) => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.warn(response);
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

  onViewCliente(row: Usuario): void {
    this.dialog.open(PreviewClienteModalComponent, {
      width: '600px',
      data: {
        row: row
      }
    });
  }

  onAgregarEditarCliente(accion: string, row?: Usuario): void {
    const dialogRef = this.dialog.open(CreateUpdateClienteModalComponent, {
      width: '600px',
      data: {
        accion: accion,
        row: row
      }
    });
    dialogRef.afterClosed().subscribe(() => this.getClientes());
  }

  onDeleteCliente(cliente: Usuario) {

    const modalInformation: Modal = {
      title: "¿Estás seguro?",
      message: `Borrarás al cliente "${cliente.nombre} ${cliente.apellidoPaterno}" permamente y ya no podrá iniciar sesión, deseas continuar?`,
      type: ModalType.yesno,
      response: ModalResponse.warning
    }

    const dialogRef = this._uiActionsService.openYesNoDialog(modalInformation);

    dialogRef.afterClosed().subscribe((response) => {

      if (response && response == 'confirm') {
        this._authService.deleteAccount(cliente.idUsuario).subscribe(
          (response: any) => {
            const modalInformation: Modal = {
              title: "Eliminado",
              message: `El cliente "${cliente.nombre} ${cliente.apellidoPaterno}" fue eliminado correctamente`,
              type: ModalType.confirmation,
              response: ModalResponse.success
            }
            const dialogRef = this._uiActionsService.openConfirmationDialog(modalInformation);
            dialogRef.afterClosed().subscribe(() => this.getClientes());
          },
          (error) => {
            const modalInformation: Modal = {
              title: "Error",
              message: "Hubo un error al eliminar el client, inténtelo de nuevo.",
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
