import { AbstractControl, ValidatorFn } from "@angular/forms";

export class ValidacionesCustomizadas {

    static soloNumerosConDosDecimales(control: AbstractControl) {
        let regexp = new RegExp('[0–9]*');
        if(control.value && !control.value.match(regexp)) {
            return { soloNumerosConDosDecimales: true };
        }

        return null;
    }

    static soloLetras(control: AbstractControl) {
        let regexp = new RegExp('[a-zA-Z]');
        if(control.value && !control.value.toString().match(regexp)) {
            return { soloLetras: true };
        }

        return null;
    }
}
