import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MetodoDePago } from 'src/app/modelos/metodo-de-pago';
import { Pago } from 'src/app/modelos/pago';
import { MetodoDePagoService } from 'src/app/servicios/metodo-de-pago.service';
import { PagoService } from 'src/app/servicios/pago.service';
import {MatDialog} from '@angular/material/dialog';
import { ModalCrearPagoComponent } from 'src/app/modales/modal-crear-pago/modal-crear-pago.component';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-formulario-pago',
  templateUrl: './formulario-pago.component.html',
  styleUrls: ['./formulario-pago.component.css']
})
export class FormularioPagoComponent implements OnInit {
  
  public pagoFormulario: FormGroup = new FormGroup(
    { }
  );
  public metodosDePago:MetodoDePago[] = [];
  public metodoDePagoSeleccionado:MetodoDePago = this.metodosDePago[0];
  public titulo:String = '';
  public tipoAccion:String = '';
  public idAEditar:number = 0;
  private readonly _metodoDePagoService:MetodoDePagoService;
  private readonly _pagoService:PagoService;
  private readonly _snackBar:MatSnackBar;
  private esCreacion:Boolean = false;
  
  constructor(public fb: FormBuilder, 
    metodoDePagoService:MetodoDePagoService, 
    pagoService:PagoService,
    public modal:MatDialog,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar) {

    this._metodoDePagoService = metodoDePagoService;
    this._pagoService = pagoService;
    this._snackBar = snackBar;
  }

  ngOnInit(): void {
    this.cargarMetodosDePago();
    this.esNuevoOEditar();
    this.formularioReactivo();
  }

  cargarMetodosDePago(){
    this._metodoDePagoService.traerMetodosDePago()
    .subscribe((data) => {
      this.metodosDePago = data;
    });
  }

  formularioReactivo() {

    this.pagoFormulario = this.fb.group({
      descripcion: [null, { validators: [ Validators.required, Validators.pattern('[a-zA-Z]*'), Validators.maxLength(20) ]}],
      deuda: [null, { validators: [ Validators.required, Validators.pattern('[0-9]+(\.[0-9]{2}?)?'), Validators.max(10000), Validators.min(100) ]}],
      pagado: [false, { validators: [ Validators.required ] }],
      metodoDePago: [null, { validators: [Validators.required]}]
      
    })
  }

  objectComparisonFunction = function( option: { id: any; }, value: { id: any; } ) : boolean {
    if(value !== null){
      return option.id === value.id;
    }

    return false;
    
  }

  abrilModal(pago:Pago): void {
    const modalRef = this.modal.open(ModalCrearPagoComponent, {
      width: '500px',
      data: pago
    });

    modalRef.afterClosed().subscribe(() => {
      this.formularioReactivo();
    });
  }

  esNuevoOEditar():void {
    this.activatedRoute.params.subscribe(
      params => {
        let paramId:number = params['id'];

        if(isNaN(paramId)){
          this.titulo = 'Crear un nuevo Pago';
          this.tipoAccion = 'Crear';
          this.esCreacion = true;
        } else {

          this.titulo = 'Editar pago';
          this.tipoAccion = 'Editar'
          this.esCreacion = false;
          this.idAEditar = paramId;
          this.editarFormulario(paramId);
        }
      }
    )
  }

  editarFormulario(idPago:number):void {
    this._pagoService.traerPago(idPago)
    .subscribe((pago) => {

      this.pagoFormulario.patchValue({
        descripcion: pago.descripcion,
        deuda: pago.deuda,
        pagado: pago.pagado,
        metodoDePago: pago.metodoDePago,       
      });
    });
  }

  submitFormulario() {

    if(this.pagoFormulario.valid) {

      let pago:Pago = this.pagoFormulario.value as Pago;
      pago.id = this.idAEditar;

      pago.deuda = +pago.deuda.toString().replace(/,/g, '.')

      if(this.esCreacion){
        this._pagoService.adicionarPago(pago)
        .subscribe((data) => {
          this.abrilModal(data);
        });
      } else {
        this._pagoService.editarPago(pago)
        .subscribe((data) => {
          this.openSnackBar("El pago: " + pago.descripcion.toUpperCase() + " Fue editado con exito", "Ok");
        });
      }

    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}
