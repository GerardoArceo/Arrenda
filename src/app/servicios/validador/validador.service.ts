import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ValidadorService {

  constructor(private httpClient: HttpClient) { }

  existeContrato(fContract_id: string): Observable<any> {
    let url = `${environment.urlApi2}distribuidores/contrato/${fContract_id}`;
    return this.httpClient.post<HttpResponse<any>>(url, {}).pipe(
      take(1),
      map((res: any) => {
        if (res != null) {
          if (res.status == 'success') {
            if (res.data[0].TOTAL > 0) {
              return true;
            }
          } else {
            return false;
          }
        }
        return false;
      })
    );
  }

  //Mock
  // existeContrato(fContract_id: string) {
  //   const fcontracts = ['47785', '7741', '1', '2'];
  //   return of(fcontracts.includes(fContract_id.toString()));
  // }
}
