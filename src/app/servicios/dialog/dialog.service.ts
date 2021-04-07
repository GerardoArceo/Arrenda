import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { take, map } from 'rxjs/operators';
import { DialogComponent } from 'src/app/components/modal/dialog/dialog.component';
import { GuardarBienComponent } from 'src/app/components/modal/guardar-bien/guardar-bien.component';
import { PopupComponent } from 'src/app/components/modal/popup/popup.component';
import { SeleccionComponent } from 'src/app/components/modal/seleccion/seleccion.component';
import { VerDatosComponent } from '../../components/modal/ver-datos/ver-datos.component';


@Injectable({
  providedIn: 'root'
})
export class DialogService {

  dialogRef: MatDialogRef<DialogComponent>;
  popUpRef: MatDialogRef<PopupComponent>;
  seleccionRef: MatDialogRef<SeleccionComponent>;
  bienesRef: MatDialogRef<GuardarBienComponent>;
  
  constructor(private dialog: MatDialog) { }

  open(opts: any) {
    this.dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: {
        title: opts.title,
        text: opts.text,
        btnAcceptText: opts.btnAcceptText,
        btnCancelText: opts.btnCancelText,
        html: opts.html
      }
    });
  }

  confirm() {
    return this.dialogRef.afterClosed().pipe(
      take(1),
      map(res => {
        return res;
      }
      ));
  }

  openPopUp(data: any) {
    this.popUpRef = this.dialog.open(PopupComponent, {
      width: '30%',
      minWidth: '300px',
      disableClose: true,
      data
    });
  }

  openGuardarBien(opts: any) {
    this.bienesRef = this.dialog.open(GuardarBienComponent, {
      width: '95%',
      disableClose: true,
      data: {
        title: opts.title,
        bien: opts.bien,
      }
    });
  }

  confirmBien() {
    return this.bienesRef.afterClosed().pipe(
      take(1),
      map(res => {
        return res;
      }
      ));
  }

  confirmPopUp() {
    return this.popUpRef.afterClosed().pipe(
      take(1),
      map(res => {
        return res;
      }
      ));
  }

  openSeleccion(opts: any) {
    this.seleccionRef = this.dialog.open(SeleccionComponent, {
      width: '75%',
      data: {
        title: opts.title,
        text: opts.text,
        btnCloseText: opts.btnCloseText,
        dataSource: opts.dataSource,
        firstField: opts.firstField,
        secondField: opts.secondField,
        firstFieldTitle: opts.firstFieldTitle,
        secondFieldTitle: opts.secondFieldTitle,
        additionalColumns:opts.additionalColumns
      }
    });
  }

  confirmSeleccion() {
    return this.seleccionRef.afterClosed().pipe(
      take(1),
      map(res => {
        return res;
      }
      ));
  }

  verDatos(opts: any) {
    this.dialog.open(VerDatosComponent, {
      width: '700px',
      data: {
        title: opts.title,
        type: opts.type,
        body: opts.body
      }
    });
  }

}
