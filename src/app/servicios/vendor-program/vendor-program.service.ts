import { Loading } from './../../components/modal/loading';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ServiceService } from 'src/app/components/services/service.service';

@Injectable({
  providedIn: 'root'
})
export class VendorProgramService {

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 3;
constructor(
  private httpClient: HttpClient,
  private _snackBar: MatSnackBar,
  private router: Router,
  private servicio: ServiceService) {

   }

  getAll() {
    let url = `${environment.urlApi}/vendor/consultaGeneral`;
    return this.httpClient.get<HttpResponse<any>>(url).pipe(
      map((m: any) => {
        if (m.status == 'success') {
          return m;
        } else {
          let n;
          n = m;
          return n;
        }
      })
    );
  }

  get(id: string){
    let url = `${environment.urlApi}/vendor/consultaId/${id}`;
    return this.httpClient.get<HttpResponse<any>>(url).pipe(
      map((m: any) => {
        if (m != undefined){          
          return m;
        }else{
          let n;
          n = m;
          return n;
        }
      })
    )
  }

  save(form: any){    
    let url = `${environment.urlApi}/vendor/alta`;       
    return this.httpClient.post<HttpResponse<any>>(url, form).pipe(
      map((m: any) => {
        if (m != undefined) {
          return m;
        } else {
          let n;
          n = m;
          return n;
        }
      })
    );
  }  

  update(form: any) {
    let url = `${environment.urlApi}/vendor/update/${form.cvevendorprogram}`;
    return this.httpClient.put<HttpResponse<any>>(url, form).pipe(
      map((m: any) => {
        if (m != undefined) {
          this.router.navigate(['arrendadora/vendor-program']);
          this.servicio.alertaSuccess("Operación realizada con éxito");
        } else {
          let n;
          n = m;
          return n;
        }
      })
    );
  }

  delete(form: any) {
    let url = `${environment.urlApi}/vendor/update/${form.cvevendorprogram}`;
    return this.httpClient.put<HttpResponse<any>>(url, form).pipe(
      map((m: any) => {
        if (m != undefined) {
          this.router.navigate(['arrendadora/vendor-program']);
          this.servicio.alertaSuccess("Operación realizada con éxito");
        } else {
          let n;
          n = m;
          return n;
        }
      })
    );
  } 


}
