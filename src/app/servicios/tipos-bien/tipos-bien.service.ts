import { Router } from '@angular/router';
import { Loading } from './../../components/modal/loading';
import { ServiceService } from './../../components/services/service.service';
import { map } from 'rxjs/operators';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TiposBienService {

constructor(
  private httpClient: HttpClient, private servicio: ServiceService,
  private router: Router
) { }

  getAll(){
    let url = `${environment.urlApi}/tipobien/consultaGeneral`;
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

  get(id: string){
    let url = `${environment.urlApi}/tipobien/consultaId/${id}`;
    return this.httpClient.get<HttpResponse<any>>(url).pipe(
      map((m: any) => {
        if (m != undefined){
          return m;
        } else {
          let n;
          n = m;
          return n;
        }
      })
    )
  }

  update(form:any){
    let url = `${environment.urlApi}/tipobien/update/${form.idtipobien}`;
    return this.httpClient.put<HttpResponse<any>>(url, form).pipe(
      map((m: any) => {
        if (m != undefined){
          this.router.navigate(['arrendadora/tipos-bien']);
          this.servicio.alertaSuccess("Operación realizada con éxito"); 
        } else {
          let n;
          n = m;
          return n;
        }
      })
    )
  }

}
