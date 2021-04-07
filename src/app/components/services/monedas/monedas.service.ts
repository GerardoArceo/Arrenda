import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MonedasService {

constructor(private httpClient: HttpClient) { }

  getAll() {
    let url = `${environment.urlApi}tasasfondeo/consulta`;
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
