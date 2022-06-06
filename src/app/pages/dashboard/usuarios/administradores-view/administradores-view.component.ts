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
import { Action } from 'src/app/models/action.enum';

@Component({
  selector: 'app-administradores-view',
  templateUrl: './administradores-view.component.html',
  styleUrls: ['./administradores-view.component.scss']
})
export class AdministradoresViewComponent implements OnInit {

  /**
   * Displayed columns
   *
   * @type {string[]}
   * @memberof AdministradoresViewComponent
   */
  displayedColumns: string[] = ['nombre', 'apellidoPaterno', 'apellidoMaterno', 'correo', 'acciones'];

  /**
   * Data source of the table.
   *
   * @type {MatTableDataSource<Usuario>}
   * @memberof AdministradoresViewComponent
   */
  dataSource: MatTableDataSource<Usuario>;

  /**
   * Paginator.
   *
   * @type {MatPaginator}
   * @memberof AdministradoresViewComponent
   */
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * Sort.
   *
   * @type {MatSort}
   * @memberof AdministradoresViewComponent
   */
  @ViewChild(MatSort) sort: MatSort;

  /**
   * Creates an instance of AdministradoresViewComponent.
   * 
   * @param {UsuariosService} _usuariosService
   * @param {MatDialog} dialog
   * @param {UiActionsService} _uiActionsService
   * @memberof AdministradoresViewComponent
   */
  constructor(private _usuariosService: UsuariosService,
              private dialog: MatDialog,
              private _uiActionsService: UiActionsService
  ) { }

  /**
   * Angular OnInit life cycle hook.
   *
   * @return {*}  {Promise<void>}
   * @memberof AdministradoresViewComponent
   */
  async ngOnInit(): Promise<void> {
    await this.getAdministradores();
  }

  /**
   * Get all the administadores.
   *
   * @return {*}  {Promise<void>}
   * @memberof AdministradoresViewComponent
   */
  async getAdministradores(): Promise<void> {

    this._uiActionsService.showSpinner();

    try{

      const administradores: Usuario[] = await this._usuariosService.getAdministradores().toPromise();

      this.dataSource = new MatTableDataSource(administradores);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    }catch{

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
   * View the information of a adminsitraodr.
   *
   * @param {Usuario} row
   * @memberof AdministradoresViewComponent
   */
  onViewAdministrador(row: Usuario): void {

    this.dialog.open(PreviewAdministradorModalComponent, {
      width: '600px',
      data: {
        row: row
      }
    });

  }

  /**
   * Opens a modal to create or edit an Administrador.
   *
   * @param {string} accion
   * @param {Usuario} [row]
   * @memberof AdministradoresViewComponent
   */
  onAgregarEditarAdministrador(accion: string, row?: Usuario): void {

    const dialogRef = this.dialog.open(CreateUpdateAdministradorModalComponent, {
      width: '600px',
      data: {
        accion: accion,
        administrador: row
      }
    });

    dialogRef.afterClosed().subscribe(async (response) => {

      if(response){
        await this.getAdministradores()
      }

    });

  }

  onDeleteAdministrador(administrador: Usuario) {
  }

  /**
   * Applys the filter.
   *
   * @param {Event} event
   * @memberof AdministradoresViewComponent
   */
  applyFilter(event: Event): void {

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

}
