import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Pago } from '../modelos/pago';
import { PagoService } from '../servicios/pago.service';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit, AfterViewInit  {

  private readonly _pagoService:PagoService;
  public readonly SERVICIO_CARO = 5000;
  public readonly SERVICIO_MEDIO_CARO = 2500
  public listaPagos:Pago[]=[];
  public dataSource = new MatTableDataSource<Pago>();
  public mostrarColumnas: string[] = ['Num','descripcion','deuda','pagado','metodoDePago','editar','borrar'];
  public titulo:string="Bienvenido a Pagos, aqui podra ver la lista de pagos que tiene pendiente, podrá editarlos y borrarlos";
  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);

  constructor(pagoService:PagoService) { 
    this._pagoService = pagoService
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.traerPagos();  
  }

  hacerFiltrado(valor:String):void{

    let encontrado = false;
    if(valor.toLocaleLowerCase() === 'si') {
      valor = 'true';
      encontrado = true;
    } else if(valor.toLocaleLowerCase() === 'no') {
      valor = 'false';
      encontrado = true;
    } 
    
    if(!encontrado)
    {
      if(valor === 'true' || valor === 'false')
      {
        valor = '***';
      }
    }

    this.dataSource.filter = valor.trim().toLocaleLowerCase();
  }

  refrescar(data:Pago[]) {
    this.listaPagos = data;
    this.dataSource = new MatTableDataSource<Pago>(data);
    this.dataSource.paginator = this.paginator;
    this.filterPredicateOverride();
  }

  filterPredicateOverride() {
    this.dataSource.filterPredicate = (order: Pago, filter: string) => {
      const transformedFilter = filter.trim().toLowerCase();
    
      const listAsFlatString = (obj: object): string => {
        let returnVal = '';
    
        Object.values(obj).forEach((val) => {
          if (typeof val !== 'object') {
            returnVal = returnVal + ' ' + val;
          } else if (val !== null) {
            returnVal = returnVal + ' ' + listAsFlatString(val);
          }
        });
    
        return returnVal.trim().toLowerCase();
      };
    
      return listAsFlatString(order).includes(transformedFilter);
    };
  }


  borrarPago(id:Number):void {
    this._pagoService.borrarPago(id)
    .subscribe(() => {
      this.traerPagos();
    });
    
  }

  traerPagos(): void {
    this._pagoService.traerPagos()
    .subscribe(data => {
      this.refrescar(data);
    });
  }

}


