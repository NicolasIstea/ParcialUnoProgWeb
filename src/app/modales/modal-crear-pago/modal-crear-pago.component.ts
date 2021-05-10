import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pago } from 'src/app/modelos/pago';

@Component({
  selector: 'app-modal-crear-pago',
  templateUrl: './modal-crear-pago.component.html',
  styleUrls: ['./modal-crear-pago.component.css']
})
export class ModalCrearPagoComponent {

  constructor(public dialogRef: MatDialogRef<ModalCrearPagoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Pago) { }

  cerrarModal(): void {
    this.dialogRef.close();
  }

}
