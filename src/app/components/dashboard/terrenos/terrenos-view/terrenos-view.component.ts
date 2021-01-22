import { Component, OnInit, ViewChild } from '@angular/core';
import { Terreno } from 'src/app/models/terreno';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TerrenosService } from 'src/app/services/terrenos.service';
import { MatDialog } from '@angular/material/dialog';
import { UiActionsService } from 'src/app/services/ui-actions.service';
import { Modal, ModalType, ModalResponse } from 'src/app/models/modal';

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

  constructor(private _terrenosService: TerrenosService, public dialog: MatDialog, private _uiActionsService: UiActionsService) { }

  ngOnInit(): void {
    this.getTerrenos();
  }

  getTerrenos(): void {
    this._terrenosService.getTerrenos().subscribe(
      (response: Terreno[]) => {
        console.warn(response);
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

  onViewTerreno(row: Terreno): void {

  }

  onAgregarEditarTerreno(accion: string, row?: Terreno): void {

  }

  onDeleteTerreno(terreno: Terreno) {



  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
