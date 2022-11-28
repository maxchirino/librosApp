import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {
  constructor() { }

  patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key:string]: any } | null => {
      if (!control.value) {
        /* Si el control está vacío no retornar ningún error */
        return null;
      }

      /* Compara el valor del control con el regex dado */
      const valid = regex.test(control.value);

      /* Si es true, no retorna ningún error (null). Si no, retornar el error pasado en el segundo parámetro */
      return valid ? null: error;
    }
  }
}
