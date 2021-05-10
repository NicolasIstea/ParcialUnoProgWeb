import { MetodoDePago } from "./metodo-de-pago";

export interface Pago {
    id:number;
    descripcion:string;
    deuda:number;
    metodoDePago:MetodoDePago;
    pagado:Boolean;
}
