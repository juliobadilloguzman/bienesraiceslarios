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
import { AuthService } from 'src/app/services/auth.service';
import { take } from 'rxjs/operators';
import { Account } from 'src/app/models/account';

@Component({
  selector: 'app-mis-terrenos-view',
  templateUrl: './mis-terrenos-view.component.html',
  styleUrls: ['./mis-terrenos-view.component.scss']
})
export class MisTerrenosViewComponent implements OnInit {

  displayedColumns: string[] = ['noManzana', 'noLote', 'superficie', 'costoM2', 'saldo', 'fraccionamiento', 'estatus', 'acciones'];
  dataSource: MatTableDataSource<Terreno>;
  account: Account;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _terrenosService: TerrenosService,
    public dialog: MatDialog,
    private _uiActionsService: UiActionsService,
    private router: Router,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this.account = JSON.parse(localStorage.getItem('authData'));
    this.getTerrenos();
    console.warn(this.account);
  }

  getTerrenos(): void {

    this._authService.userId.pipe(take(1)).subscribe(
      (idUsuario) => {

        if (!idUsuario)
          return;

        this._terrenosService.getTerrenosFromUsuario(idUsuario).subscribe(
          (response: Terreno[]) => {
            console.warn(response);
            if (response) {
              console.warn(response);
              this.dataSource = new MatTableDataSource(response);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            } else {
              const modalInformation: Modal = {
                title: "Error",
                message: "Error al cargar la informacion, verifique su conexion a internet o póngase en contacto con nosotros.",
                type: ModalType.confirmation,
                response: ModalResponse.failed
              }
              this._uiActionsService.openConfirmationDialog(modalInformation);
            }
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

      });

  }

  onViewTerreno(row: Terreno): void {

  }

  onViewMensualidades(terreno: Terreno) {
    this.router.navigateByUrl('/dashboard/mensualidades/mis-mensualidades', { state: { terreno: terreno } });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

}
