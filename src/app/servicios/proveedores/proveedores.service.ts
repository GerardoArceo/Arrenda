import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/components/services/service.service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  constructor(
    private httpClient: HttpClient,
    private _snackBar: MatSnackBar,
    private router: Router,
    private servicio: ServiceService
  ) { }

  getAll() {
    let url = `${environment.urlApi}/proveedores/consultaGeneral`;
    return this.httpClient.get<HttpResponse<any>>(url).pipe(
      map((m: any) => {
        if (m.proveedores == 'success') {
          return m;
        } else {
          let n;
          n = m;
          return n;
        }
      })
    );
  }

  get(id: string) {
    let url = `${environment.urlApi}/proveedores/consultaId/${id}`;
    return this.httpClient.get<HttpResponse<any>>(url).pipe(
      map((m: any) => {
        if (m != undefined) {
          return m;
        } else {
          let n;
          n = m;
          return n;
        }
      })
    )
  }

  save(form: any) {
    let url = `${environment.urlApi}/proveedores/alta`;
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
    let url = `${environment.urlApi}/proveedores/update/${form.cveproveedores}`;
    return this.httpClient.put<HttpResponse<any>>(url, form).pipe(
      map((m: any) => {
        if (m != undefined) {
          this.router.navigate(['arrendadora/proveedores']);
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
    let url = `${environment.urlApi}/proveedores/update/${form.cveproveedores}`;
    return this.httpClient.put<HttpResponse<any>>(url, form).pipe(
      map((m: any) => {
        if (m != undefined) {
          this.router.navigate(['arrendadora/proveedores']);
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


