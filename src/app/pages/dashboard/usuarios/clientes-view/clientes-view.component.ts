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

  /**
   * Columns of the table.
   *
   * @type {string[]}
   * @memberof ClientesViewComponent
   */
  displayedColumns: string[] = ['nombre', 'apellidoPaterno', 'apellidoMaterno', 'correo', 'acciones'];

  /**
   * Data Source of the Table.
   *
   * @type {MatTableDataSource<Usuario>}
   * @memberof ClientesViewComponent
   */
  dataSource: MatTableDataSource<Usuario>;

  /**
   * Paginator of the table.
   *
   * @type {MatPaginator}
   * @memberof ClientesViewComponent
   */
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * Sort of the table.
   *
   * @type {MatSort}
   * @memberof ClientesViewComponent
   */
  @ViewChild(MatSort) sort: MatSort;

  /**
   * Creates an instance of ClientesViewComponent.
   * 
   * @param {UsuariosService} usuariosService
   * @param {MatDialog} dialog
   * @param {UiActionsService} uiActionsService
   * @param {AuthService} authService
   * @memberof ClientesViewComponent
   */
  constructor(private usuariosService: UsuariosService,
              private dialog: MatDialog,
              private uiActionsService: UiActionsService,
              private authService: AuthService) { }

  /**
   * Angular OnInit life cycle hook.
   *
   * @return {*}  {Promise<void>}
   * @memberof ClientesViewComponent
   */
  async ngOnInit(): Promise<void> {
    await this.getClientes();
  }

  /**
   * Get all the Clientes.
   *
   * @return {*}  {Promise<void>}
   * @memberof ClientesViewComponent
   */
  async getClientes(): Promise<void> {

    this.uiActionsService.showSpinner();

    try{

      const clientes: Usuario[] = await this.usuariosService.getClientes().toPromise();

      this.dataSource = new MatTableDataSource(clientes);
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
   * View all the Cliente information.
   *
   * @param {Usuario} row
   * @memberof ClientesViewComponent
   */
  onViewCliente(row: Usuario): void {

    this.dialog.open(PreviewClienteModalComponent, {
      width: '50vh',
      data: {
        row: row
      }
    });

  }

  /**
   * Opens a modal to edit or create a Cliente.
   *
   * @param {string} accion
   * @param {Usuario} [row]
   * @memberof ClientesViewComponent
   */
  onAgregarEditarCliente(accion: string, row?: Usuario): void {

    const dialogRef = this.dialog.open(CreateUpdateClienteModalComponent, {
      width: '70vh',
      maxHeight: '70vh',
      data: {
        accion: accion,
        row: row
      }
    });

    dialogRef.afterClosed().subscribe(async () => await this.getClientes());

  }

  /**
   * Deletes a clIENTE.
   *
   * @param {Usuario} cliente
   * @memberof ClientesViewComponent
   */
  onDeleteCliente(cliente: Usuario) {

    const modalInformation: Modal = {
      title: "¿Estás seguro?",
      message: `Borrarás al cliente "${cliente.nombre} ${cliente.apellidoPaterno}" permamente y ya no podrá iniciar sesión, deseas continuar?`,
      type: ModalType.yesno,
      response: ModalResponse.warning
    }

    const dialogRef = this.uiActionsService.openYesNoDialog(modalInformation);

    dialogRef.afterClosed().subscribe(async (response) => {

      if (response && response == 'confirm') {

        this.uiActionsService.showSpinner();

        try{

          await this.authService.deleteAccount(cliente.idUsuario).toPromise();

          const modalInformation: Modal = {
            title: "Eliminado",
            message: `El cliente "${cliente.nombre} ${cliente.apellidoPaterno}" fue eliminado correctamente`,
            type: ModalType.confirmation,
            response: ModalResponse.success
          }

          const dialogRef = this.uiActionsService.openConfirmationDialog(modalInformation);

          dialogRef.afterClosed().subscribe(async () => await this.getClientes());

        }catch{

          const modalInformation: Modal = {
            title: "Error",
            message: "Hubo un error al eliminar el cliente, inténtelo de nuevo.",
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
   * Applys a filter to the table.
   *
   * @param {Event} event
   * @memberof ClientesViewComponent
   */
  applyFilter(event: Event): void {

    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

}
