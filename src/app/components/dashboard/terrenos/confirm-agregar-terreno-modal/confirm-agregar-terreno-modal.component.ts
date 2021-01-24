import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from 'src/app/models/usuario';
import { FraccionamientosService } from 'src/app/services/fraccionamientos.service';
import { Fraccionamiento } from 'src/app/models/fraccionamiento';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-confirm-agregar-terreno-modal',
  templateUrl: './confirm-agregar-terreno-modal.component.html',
  styleUrls: ['./confirm-agregar-terreno-modal.component.scss']
})
export class ConfirmAgregarTerrenoModalComponent implements OnInit {

  cliente: Usuario;
  fraccionamiento: Fraccionamiento;

  showSaldoInput: boolean = false;
  saldoCtrl: FormControl = new FormControl();

  constructor(
    public dialogRef: MatDialogRef<ConfirmAgregarTerrenoModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private _usuariosService: UsuariosService,
    private _fraccionamientosService: FraccionamientosService
  ) { }

  ngOnInit(): void {
    console.warn(this.data);
    this.getFraccionamiento();
    this.getCliente();
  }

  getCliente(): void {
    this._usuariosService.getUsuario(this.data.form.usuarioIdUsuario).subscribe(
      (response) => {
        this.cliente = response;
      },
      (error) => {

      }
    );
  }

  getFraccionamiento(): void {
    this._fraccionamientosService.getFraccionamiento(this.data.form.fraccionamientoIdFraccionamiento).subscribe(
      (response) => {
        this.fraccionamiento = response;
      },
      (error) => {

      }
    );
  }

  modifySaldo() {
    this.showSaldoInput = true;
  }

  cancelNewSaldo() {
    this.showSaldoInput = false;
  }

  closeDialog(action?: string) {

    if (this.showSaldoInput) {
      this.data.form.saldo = this.saldoCtrl.value;
    }

    if (action) {
      this.dialogRef.close({ action: action, form: this.data.form });
    } else {
      this.dialogRef.close();
    }

  }

}
