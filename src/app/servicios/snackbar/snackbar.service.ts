import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 3;

  constructor(private _snackBar: MatSnackBar) { }

  alertaSuccess(msj: string) {
    // if(msj.indexOf('<br>')==-1){
      this._snackBar.open(msj, '', {
        duration: this.durationInSeconds * 1000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        panelClass: 'alerta-success'
      });
    // } else {
    //   this._snackBar.open('','', {
    //     duration: this.durationInSeconds * 1000,
    //     horizontalPosition: this.horizontalPosition,
    //     verticalPosition: this.verticalPosition,
    //     panelClass: 'alerta-success',
    //     data:{
    //       html:msj
    //     }
    //   });
    // }
  }

  alertaError(msj) {
    // if(msj.indexOf('<br>')==-1){
      this._snackBar.open(msj, '', {
        duration: this.durationInSeconds * 1000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        panelClass: 'alerta-error'
      });
    // } else {
    //   this._snackBar.(, {
    //     duration: this.durationInSeconds * 1000,
    //     horizontalPosition: this.horizontalPosition,
    //     verticalPosition: this.verticalPosition,
    //     panelClass: 'alerta-error',
    //     data:{
    //       html:msj
    //     }
    //   });
    // }
  }

}
