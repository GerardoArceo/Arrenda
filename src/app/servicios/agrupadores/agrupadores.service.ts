import { Router } from '@angular/router';
import { ServiceService } from './../../components/services/service.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AgrupadoresService {

  constructor(
    private httpClient: HttpClient, private servicio: ServiceService, private router: Router
  ) { }

  getAllAgrupadores() {
    let url = `${environment.urlApi}/agrupadores/consultaGeneral`;
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
    );
  }

  getAgrupador(id: string) {
    let url = `${environment.urlApi}/agrupadores/consultaId/${id}`;
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

  updateAgrupador(form: any) {
    let url = `${environment.urlApi}/agrupadores/update/${form.cveagrupador}`;
    return this.httpClient.put<HttpResponse<any>>(url, form).pipe(
      map((m: any) => {
        if (m != undefined) {
          this.router.navigate(['arrendadora/agrupadores']);
          this.servicio.alertaSuccess("Operación realizada con éxito");
        } else {
          let n;
          n = m;
          return n;
        }
      })
    )
  }

  saveAgrupador(form: any){    
    let url = `${environment.urlApi}/agrupadores/alta`;       
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

  deleteAgrupador(form: any) {
    let url = `${environment.urlApi}/agrupadores/update/${form.cveagrupador}`;
    return this.httpClient.put<HttpResponse<any>>(url, form).pipe(
      map((m: any) => {
        if (m != undefined) {
          this.router.navigate(['arrendadora/monedas']);
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
