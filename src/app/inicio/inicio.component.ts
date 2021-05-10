import { Component, OnInit } from '@angular/core';
import { CardActividad } from '../modelos/card-actividad';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  public titulo:string="Bienvenido a pago servicios aqui podra dar de alta todos aquellos impuestos que quiera pagar, eligiendo los tipos de pago que aqui se ofrece";

  constructor() { }

  public actividadesCard:CardActividad[] = [
    { imagenUrl:'../../assets/img/SearchPayments.jpg', imagenText:'Buscar Pago', titulo:'Buscar Pago', descripcion:'Aqui podrá buscar todos los pagos creados en este sitio', textoAccion:'Buscar', routeoLink: '/pago' },
    { imagenUrl:'../../assets/img/PayService.png', imagenText:'Crear Pago', titulo:'Crear Pago', descripcion:'Aqui podra llenar un formulario con el pago a realizar', textoAccion:'Crear', routeoLink: '/pago-nuevo' },
  ]

  ngOnInit(): void {

  }

}
