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
export class StatusService {

  constructor(
    private httpClient: HttpClient,
    private _snackBar: MatSnackBar,
    private router: Router,
    private servicio: ServiceService
  ) { }

  getAll() {
    let url = `${environment.urlApi}/status/consultaGeneral`;
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

  get(id: string) {
    let url = `${environment.urlApi}/status/consultaId/${id}`;
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
    let url = `${environment.urlApi}/status/alta`;
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
    let url = `${environment.urlApi}/status/update/${form.idstatus}`;
    return this.httpClient.put<HttpResponse<any>>(url, form).pipe(
      map((m: any) => {
        if (m != undefined) {
          this.router.navigate(['arrendadora/status']);
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
    let url = `${environment.urlApi}/status/update/${form.idstatus}`;
    return this.httpClient.put<HttpResponse<any>>(url, form).pipe(
      map((m: any) => {
        if (m != undefined) {
          this.router.navigate(['arrendadora/status']);
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


