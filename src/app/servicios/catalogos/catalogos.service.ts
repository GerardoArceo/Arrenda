import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CatalogosService {

  constructor(private httpClient: HttpClient) { }

  getCaracteristicas(){
    return this.getAll('/caracteristicas/consultaGeneral');
  }

  getAgrupadores() {
    return this.getAll('/agrupadores/consultaGeneral');
  }
  
  getTiposBien(){
    return this.getAll('/tipobien/consultaGeneral');
  }

  getAgrupadoresById(id: string) {
    return this.get(`/agrupadores/consultaId/${id}`);
  }



  getCaracteristicasByAgrupador(id: string) {
    return this.get(`/gpocaracteristicas/consultacveag/${id}`);
  }

  get(cat: string) {
    let url = `${environment.urlApi}${cat}`;
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

  private getAll(route) {
    let url = environment.urlApi + route;
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

  private getAllManagedCatalog(route) {
    let url = environment.urlApi + route;
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

}
