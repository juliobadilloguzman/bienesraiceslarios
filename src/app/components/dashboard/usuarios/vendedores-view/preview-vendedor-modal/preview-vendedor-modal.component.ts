import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Vendedor } from 'src/app/models/vendedor';

@Component({
  selector: 'app-preview-vendedor-modal',
  templateUrl: './preview-vendedor-modal.component.html',
  styleUrls: ['./preview-vendedor-modal.component.scss']
})
export class PreviewVendedorModalComponent implements OnInit {

  vendedor: Vendedor;

  constructor(
    public dialogRef: MatDialogRef<PreviewVendedorModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) { }

  ngOnInit(): void {
    this.vendedor = this.data['row'];
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
