import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pago } from '../modelos/pago';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  
  constructor(private http: HttpClient) { }

  editarPago(pago: Pago):Observable<Pago> {
    return this.http.put<Pago>('api/pagos/'+pago.id, pago, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  borrarPago(id: Number):Observable<void> {
    return this.http.delete<void>('api/pagos/'+id);
  }

  traerPagos():Observable<Pago[]>{   
    return this.http.get<Pago[]>('api/pagos');
  }

  traerPago(id:Number):Observable<Pago> {
    return this.http.get<Pago>('api/pagos/'+id);
  }

  adicionarPago(pago:Pago):Observable<Pago> {
      return this.http.post<Pago>('api/pagos', pago, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
  }
}
