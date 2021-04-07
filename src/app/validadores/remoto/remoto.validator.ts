import { AbstractControl, AsyncValidatorFn, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ValidadorService } from 'src/app/servicios/validador/validador.service';

export class RemotoValidator extends Validators {


  static existeContrato(service: ValidadorService, formId: string): AsyncValidatorFn {
    // return (control: AbstractControl) => {
    //   if (control.value != null && control.value != "") {
    //     return service.existeContrato(control.value).pipe(
    //       map((res: boolean) => (res == true ? { 'existeContrato': true } : null))
    //     );
    //   }
    // };
    let tmp = null;
    return (control: AbstractControl): Observable<ValidationErrors> => {
      if (control.value != null && control.value != "" && (formId == null || formId == '')) {
        service.existeContrato(control.value).subscribe((res: boolean) => {
          tmp = res == true ? { 'existeContrato': true } : null;
        }
        );
      }
      return tmp;
    };
  }
}
