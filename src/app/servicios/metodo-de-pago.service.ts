import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MetodoDePago } from '../modelos/metodo-de-pago';

@Injectable({
  providedIn: 'root'
})
export class MetodoDePagoService {

  traerMetodoDePago(metodoDePagoId: number): Observable<MetodoDePago> {
    return this.http.get<MetodoDePago>('api/metodosDePago/'+metodoDePagoId);
  }

  constructor(private http: HttpClient) { }

  traerMetodosDePago():Observable<MetodoDePago[]>{   
    return this.http.get<MetodoDePago[]>('api/metodosDePago');
  }
}
