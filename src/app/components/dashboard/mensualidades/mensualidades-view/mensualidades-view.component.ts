import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Terreno } from 'src/app/models/terreno';
import { Mensualidad } from 'src/app/models/mensualidad';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MensualidadesService } from 'src/app/services/mensualidades.service';
import { MatDialog } from '@angular/material/dialog';
import { UiActionsService } from 'src/app/services/ui-actions.service';
import { Modal, ModalType, ModalResponse } from 'src/app/models/modal';
import { PreviewMensualidadModalComponent } from '../preview-mensualidad-modal/preview-mensualidad-modal.component';
import { CreateUpdateMensualidadModalComponent } from '../create-update-mensualidad-modal/create-update-mensualidad-modal.component';
import { DownloadService } from 'src/app/services/download.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-mensualidades-view',
  templateUrl: './mensualidades-view.component.html',
  styleUrls: ['./mensualidades-view.component.scss']
})
export class MensualidadesViewComponent implements OnInit {

  state$: Observable<object>;
  terreno: Terreno;
  mensualidades: Mensualidad[];

  displayedColumns: string[] = ['numeroMensualidad', 'fechaPago', 'monto', 'mes', 'interes', 'estatusMensualidad', 'acciones'];
  dataSource: MatTableDataSource<Mensualidad>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private _mensualidadesService: MensualidadesService,
    public dialog: MatDialog,
    private _uiActionsService: UiActionsService,
    private _downloadService: DownloadService,
    private currencyPipe: CurrencyPipe
  ) { }

  ngOnInit(): void {
    this.state$ = this.route.paramMap.pipe(map(() => window.history.state));
    this.state$.subscribe(response => {
      this.terreno = response['terreno'];
      console.log('terreno', this.terreno);
    });
    if (!this.terreno) {
      const modalInformation: Modal = {
        title: "Error",
        message: "Debe de seleccionar las mensualidades desde la tabla de terrenos",
        type: ModalType.confirmation,
        response: ModalResponse.failed
      }
      const dialogRef = this._uiActionsService.openConfirmationDialog(modalInformation);
      dialogRef.afterClosed().subscribe(() => {
        this.router.navigateByUrl('/dashboard/terrenos');
      });
    } else {
      this.getMensualidades();
    }
  }

  getMensualidades(): void {
    this._mensualidadesService.getMensualidadesFromTerreno(this.terreno.idTerreno).subscribe(
      (response: Mensualidad[]) => {
        if (response) {
          this.dataSource = new MatTableDataSource(response);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.mensualidades = response;
          console.warn('mensualidades', this.mensualidades);

        } else {
          const modalInformation: Modal = {
            title: "Error",
            message: "Error al cargar la información, verifique su conexión a internet e inténtelo de nuevo",
            type: ModalType.confirmation,
            response: ModalResponse.failed
          }
          this._uiActionsService.openConfirmationDialog(modalInformation);
        }
      },
      (error) => {
        const modalInformation: Modal = {
          title: "Error",
          message: "Error al cargar la información, verifique su conexión a internet e inténtelo de nuevo",
          type: ModalType.confirmation,
          response: ModalResponse.failed
        }
        this._uiActionsService.openConfirmationDialog(modalInformation);
      }
    );
  }

  getInteresTable(mensualidad: Mensualidad) {
    if (mensualidad.interes == null) {
      return this.currencyPipe.transform(0);
    } else {
      if (mensualidad.estatusInteres == 'PAGADO') {
        return `${this.currencyPipe.transform(mensualidad.interes)}`
      } else if (mensualidad.estatusInteres == 'NO PAGADO') {
        return `${this.currencyPipe.transform(mensualidad.interes)}`
      }
    }
  }

  onViewMensualidad(row: Mensualidad): void {
    this.dialog.open(PreviewMensualidadModalComponent, {
      width: '600px',
      data: {
        row: row
      }
    });
  }

  onAgregarEditarMensualidad(accion: string, row?: Mensualidad): void {
    const dialogRef = this.dialog.open(CreateUpdateMensualidadModalComponent, {
      width: '600px',
      data: {
        accion: accion,
        row: row,
        idTerreno: this.terreno.idTerreno,
        montoMensualidad: this.terreno.montoMensualidad
      }
    });
    dialogRef.afterClosed().subscribe(() => this.getMensualidades());
  }

  onDeleteMensualidad(mensualidad: Mensualidad) {

  }

  generarReporte(): void {
    this._downloadService.generateEstadoCuentaPdf(this.mensualidades, this.terreno);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
