import { Component, OnInit, ViewChild } from '@angular/core';
import { VendedoresService } from '../../../../services/vendedores.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Vendedor } from '../../../../models/vendedor';
import { MatDialog } from '@angular/material/dialog';
import { CreateUpdateVendedorModalComponent } from './create-update-vendedor-modal/create-update-vendedor-modal.component';
import { UiActionsService } from 'src/app/services/ui-actions.service';
import { ModalType, ModalResponse, Modal } from 'src/app/models/modal';
import { PreviewVendedorModalComponent } from './preview-vendedor-modal/preview-vendedor-modal.component';

@Component({
  selector: 'app-vendedores-view',
  templateUrl: './vendedores-view.component.html',
  styleUrls: ['./vendedores-view.component.scss']
})
export class VendedoresViewComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'apellidoPaterno', 'apellidoMaterno', 'correo', 'acciones'];
  dataSource: MatTableDataSource<Vendedor>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _vendedoresService: VendedoresService, public dialog: MatDialog, private _uiActionsService: UiActionsService) { }

  ngOnInit(): void {
    this.getVendedores();
  }

  getVendedores(): void {
    this._vendedoresService.getVendedores().subscribe(
      (response: Vendedor[]) => {
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

  onViewVendedor(row: Vendedor): void {
    this.dialog.open(PreviewVendedorModalComponent, {
      width: '600px',
      data: {
        row: row
      }
    })
  }

  onAgregarEditarVendedor(accion: string, row?: Vendedor): void {
    const dialogRef = this.dialog.open(CreateUpdateVendedorModalComponent, {
      width: '600px',
      data: {
        accion: accion,
        row: row
      }
    });
    dialogRef.afterClosed().subscribe(() => this.getVendedores());
  }

  onDeleteVendedor(vendedor: Vendedor) {

    const modalInformation: Modal = {
      title: "¿Estás seguro?",
      message: `Borrarás al vendedor "${vendedor.nombre} ${vendedor.apellidoPaterno}" permamente, deseas continuar?`,
      type: ModalType.yesno,
      response: ModalResponse.warning
    }

    const dialogRef = this._uiActionsService.openYesNoDialog(modalInformation);

    dialogRef.afterClosed().subscribe((response) => {

      if (response && response == 'confirm') {
        this._vendedoresService.deleteVendedor(vendedor.idVendedor).subscribe(
          (response: any) => {
            const modalInformation: Modal = {
              title: "Eliminado",
              message: `El vendedor "${vendedor.nombre} ${vendedor.apellidoPaterno}" fue eliminado correctamente`,
              type: ModalType.confirmation,
              response: ModalResponse.success
            }
            const dialogRef = this._uiActionsService.openConfirmationDialog(modalInformation);
            dialogRef.afterClosed().subscribe(() => this.getVendedores());
          },
          (error) => {
            const modalInformation: Modal = {
              title: "Error",
              message: "Hubo un error al eliminar el vendedor, inténtelo de nuevo.",
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
