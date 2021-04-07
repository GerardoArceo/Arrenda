import { Agrupador } from './../agrupadores/Agrupador';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Loading } from '../modal/loading';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import {environment} from "../../../environments/environment"
import { map } from 'rxjs/operators';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class ServiceService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 3;
  private peticion1: Subscription;
  private peticion2: Subscription;

  private urlApi = environment.urlApi;
  private urlApi2 = environment.urlApi2;

  // header:HttpHeaders = new HttpHeaders({
  //   'Content-Type': 'application/json',
  //   'Access-Control-Allow-Origin' : 'http://localhost:8080',
  // });

  constructor(
    protected http: HttpClient,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router) {
  }

  // ngOnDestroy() {
  //   this.peticion1.unsubscribe();
  //   this.peticion2.unsubscribe();
  // }

  getAll(url) {
    return this.http.get(this.urlApi + url);
  }

  public getAllHeaders(url): Observable<any>{
    const opts = {
      headers: new HttpHeaders({
        'X-Requested-With': 'HttpClient'
      })
    };
    return this.http.get(this.urlApi + url, opts);
  }
  
  save(url, datas, catalogo) {
    console.log(JSON.stringify(datas));
    Loading.show();
    // this.peticion1 = this.http.post(this.urlApi + url, datas).subscribe(
    this.http.post(this.urlApi + url, datas).subscribe(
      (next) => {        
        this.router.navigate(['arrendadora/' + catalogo]);
        this.alertaSuccess("Operación realizada con éxito");
      },
      (error) => {
        console.log("error");
        console.log(error);
        Loading.hidden();
        this.alertaError("Ocurrió un error " + error.statusText);
      },
      () => {
        Loading.hidden();
      });
    // pet.unsubscribe();
  }

  getAll2(url) {
    return this.http.get(this.urlApi2 + url);
  }

  save2(url, datas, catalogo) {
    Loading.show();
    // this.peticion2 = this.http.post(this.urlApi2 + url, datas).subscribe(
    this.http.post(this.urlApi2 + url, datas).subscribe(
      (next) => {
        console.log(next);
        if (next["status"] == "success") {
          this.router.navigate(['arrendadora/' + catalogo]);
          this.alertaSuccess("Operación realizada con éxito");
        } else {
          console.log(next["message"]);
          this.alertaError("Ocurrió un error en el proceso");
        }
      },
      (error) => {
        console.log(error);
        console.log("error:");
        console.log(error.error.message);
        Loading.hidden();
        this.alertaError("Ocurrió un error " + error.statusText);
      },
      () => {
        Loading.hidden();
      });
  }

  update(url, datas, catalogo) {
    Loading.show();
    this.http.put(this.urlApi + url, datas).subscribe(
      (next) => {
        console.log(next);        
          this.router.navigate(['arrendadora/' + catalogo]);
          this.alertaSuccess("Operación realizada con éxito");        
      },
      (error) => {
        console.log("error");
        console.log(error);
        Loading.hidden();
        this.alertaError("Ocurrió un error " + error.statusText);
      },
      () => {
        Loading.hidden();
      });
  }

  delete(url, datas, catalogo) {
    Loading.show();
    try {
      this.http.delete(this.urlApi + url, datas).subscribe(
          (next) => {            
            this.router.navigate(['arrendadora/' + catalogo]);
            this.alertaSuccess("Operación realizada con éxito");
          },
          (error) => {       
            console.log(error);
            Loading.hidden();
            this.alertaError("Ocurrió un error " + error.statusText);
          },
          () => {
            Loading.hidden();
          });        
      
    } catch (error) {
      this.alertaError("Ocurrió un error en el proceso");
    }      
     Loading.hidden();
  }

  alertaSuccess(msj: string) {
    this._snackBar.open(msj, '', {
      duration: this.durationInSeconds * 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: "alerta-success"
    });
  }

  alertaError(msj) {
    this._snackBar.open(msj, '', {
      duration: this.durationInSeconds * 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: "alerta-error"
    });
  }

  

}

interface GetResponse {
    agrupadores: Agrupador[];
}