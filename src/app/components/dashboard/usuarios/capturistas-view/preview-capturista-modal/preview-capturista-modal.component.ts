import { Component, OnInit, Inject } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-preview-capturista-modal',
  templateUrl: './preview-capturista-modal.component.html',
  styleUrls: ['./preview-capturista-modal.component.scss']
})
export class PreviewCapturistaModalComponent implements OnInit {

  capturista: Usuario;

  constructor(
    public dialogRef: MatDialogRef<PreviewCapturistaModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) { }

  ngOnInit(): void {
    this.capturista = this.data['row'];
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
