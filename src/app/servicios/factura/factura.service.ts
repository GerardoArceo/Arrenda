import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  dev = false;

  constructor(private httpClient: HttpClient) { }

  altaFactura(form: any) {
    let url = `${environment.urlApi3}facturas/alta/factura`;
    return this.httpClient.post<HttpResponse<any>>(url, form).pipe(
      map((m: any) => {
        console.log(m);
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


  getPlantilla() {
    let url = `${environment.urlApi3}reportes/plantilla/tasasfondeo`;
    window.open(url, '_blank');
  }

  getFacturas() {
    if (this.dev) {
      const result = {
        status: "success", 
        message: ". . : : Consulta Exitosa : : . .", 
        data: {
          movimientos: [
            {
              "ID_FACTURA": "80",
              "CLAVE_FACTURA": "121",
              "FECHA_ALTA": "2010-04-21 00:00:00.0",
              "NUMERO_CLIENTE": "1",
              "NOMBRE_CLIENTE": "",
              "CLAVE_EMPRESA": "1",
              "NOMBRE_EMPRESA": "1 BANAMEX",
              "CLAVE_PROVEEDOR": "136",
              "NOMBRE_PROVEEDOR": "MITSUI 0, LTD.",
              "CLAVE_MONEDA": "1",
              "NOMBRE_MONEDA": "Peso Mexicano",
              "BIENES": "",
              "IMPORTE": "",
              "IVA": "",
              "TOTAL": "",
              "TIPO_CAMBIO": "1"
            },
            {
              "ID_FACTURA": "98",
              "CLAVE_FACTURA": "2455454",
              "FECHA_ALTA": "2021-04-01 00:00:00.0",
              "NUMERO_CLIENTE": "130373",
              "NOMBRE_CLIENTE": "CONSTRUCTORA CADENA SA DE CV",
              "CLAVE_EMPRESA": "1",
              "NOMBRE_EMPRESA": "1 BANAMEX",
              "CLAVE_PROVEEDOR": "136",
              "NOMBRE_PROVEEDOR": "MITSUI 0, LTD.",
              "CLAVE_MONEDA": "1",
              "NOMBRE_MONEDA": "Peso Mexicano",
              "BIENES": "",
              "IMPORTE": "",
              "IVA": "",
              "TOTAL": "",
              "TIPO_CAMBIO": "1"
            },
          ]
        }
      };
      return of(result);
    }
    
    return this.getCatalogo('facturas/consulta');
  }

  getEmpresas() {
    if (this.dev) {
      const result = {
        "status": "success",
        "message": ". . : : Consulta Exitosa : : . .",
        "data": {
          "movimientos": [
            {
              "CLAVE_EMPRESA": "1",
              "NOMBRE_EMPRESA": "1 BANAMEX"
            },
            {
              "CLAVE_EMPRESA": "2",
              "NOMBRE_EMPRESA": "2 CITIBANK"
            },
          ]
        }
      };
      return of(result);
    }
    return this.getCatalogo('facturas/consulta/empresa');
  }

  getProveedores() {
    if (this.dev) {
      const result = {
        "status": "success",
        "message": ". . : : Consulta Exitosa : : . .",
        "data": {
          "movimientos": [
            {
              "PROV_CVE_PROVEEDOR": "136",
              "PROV_NOM_PROVEEDOR": "MITSUI 0, LTD."
            },
            {
              "PROV_CVE_PROVEEDOR": "137",
              "PROV_NOM_PROVEEDOR": "ARSOGA MOTOR S, S.A. DE C.V."
            },
            {
              "PROV_CVE_PROVEEDOR": "138",
              "PROV_NOM_PROVEEDOR": "DISE%OS INTEGRALES CON INFORMATICA,"
            },
            {
              "PROV_CVE_PROVEEDOR": "139",
              "PROV_NOM_PROVEEDOR": "AUTO LINEAS MAGUEY, S.A. DE C.V."
            },
          ]
        }
      };
      return of(result);
    }
    return this.getCatalogo('facturas/consulta/proveedor');
  }

  getMonedas() {
    if (this.dev) {
      const result = {
        "status": "success",
        "message": ". . : : Consulta Exitosa : : . .",
        "data": {
          "movimientos": [
            {
              "CLAVE_MONEDA": "1",
              "NOMBRE_MONEDA": "Peso Mexicano",
              "NOMBRE_CORTO_MONEDA": "MXN"
            },
            {
              "CLAVE_MONEDA": "5",
              "NOMBRE_MONEDA": "Dolares Americanos",
              "NOMBRE_CORTO_MONEDA": "USD"
            }
          ]
        }
      };

      return of(result);
    }
    return this.getCatalogo('facturas/consulta/moneda');
  }

  getCaracteristicasBien(id) {
    if (this.dev) {
      const result = {
        "status": "success",
        "message": ". . : : Consulta Exitosa : : . .",
        "data": {
          "caracterisitica": [
            {
              "CRC_CVE_CARACTERISTICA": "1",
              "CRC_DESC_CARACTERISTICA": "NOMBRE"
            },
            {
              "CRC_CVE_CARACTERISTICA": "3",
              "CRC_DESC_CARACTERISTICA": "MARCA"
            },
            {
              "CRC_CVE_CARACTERISTICA": "4",
              "CRC_DESC_CARACTERISTICA": "MODELO"
            },
          ]
        }
      };
      return of(result);
    }
    return this.getCatalogo('facturas/consulta/caracteristica/'+id);
  }
  
  getDetalleFactura(id) {
    if (this.dev) {
      const result = {
        "status": "success",
        "message": ". . : : Consulta Exitosa : : . .",
        "data": {
          "movimientos": [
            {
              "NUMERO_FACTURA": "123456789SSS",
              "FECHA_ALTA": "2021-03-25 00:00:00.0",
              "NUMERO_CLIENTE": "123456789",
              "CLAVE_EMPRESA": "1 BANAMEX",
              "CLAVE_PROVEEDOR": "139",
              "NOMBRE_PROVEEDOR": "AUTO LINEAS MAGUEY, S.A. DE C.V.",
              "INV_FAC": "1",
              "INV_CRED": "1",
              "ESTATUS": "0 PENDIENTE",
              "MONEDA": "Peso Mexicano",
              "AUT_TIPO_CAMBIO": "1",
              "TIPO_CAMBIO": "1",
              "IMPORTE": "1212",
              "IVA": "0",
              "NUMERO_NOTA_CREDITO": "1",
              "IMPORTE_NOTA_CREDITO": "1",
              "IVA_NOTA_CREDITO": "1",
              "OBSERVACIONES": "1",
              "TIPO_COMPRA": "1",
              "IMPORTE_COMPRA": "1",
              "IVA_COMPRA": "1",
              "PRIMERA_RENTA": "1990-09-14 00:00:00.0",
              "IVA_COSTO_ADQUISICION": "1",
              "AFORO": "1",
              "VALOR_RESIDUAL": "1",
              "RENTA": "1",
              "CLAVE_FAMILIA": "1",
              "CLAVE_GENERICO": "1",
              "CLAVE_DIVISION": "1",
              "CLAVE_GRUPO": "1",
              "CLAVE_SUBGRUPO": "1"
            },
          ]
        }
      }
      return of(result);
    }
    return this.getCatalogo('facturas/caratula/detalles/'+id);
  }

  getFactura(id) {
    if (this.dev) {
      const result = {
        "status": "success",
        "message": ". . : : Consulta Exitosa : : . .",
        "data": {
          "movimientos": [
            {
              "ID_FACTURA": "80",
              "CLAVE_FACTURA": "121",
              "FECHA_ALTA": "2010-04-21 00:00:00.0",
              "NUMERO_CLIENTE": "1",
              "CLAVE_EMPRESA": "1",
              "CLAVE_PROVEEDOR": "136",
              "MONEDA": "1",
              "BIENES": "",
              "IMPORTE": "",
              "IVA": "",
              "TOTAL": "",
              "TIPO_CAMBIO": "1"
            }
          ]
        }
      };
      return of(result);
    }
    return this.getCatalogo('facturas/consulta/'+id);
  }

  getInventario() {
    if (this.dev) {
      const result = {
        "status": "success",
        "message": null,
        "data": [
          {
            "TB_ID_TIPOBIEN": "251",
            "TB_CVE_FAMILIA": "2",
            "TB_CVE_GENERICO": "16",
            "TB_CVE_DIVISION": "1",
            "TB_CVE_GRUPO": "2",
            "TB_CVE_SUBGRUPO": "0",
            "AGR_CVE_AGRUPADOR": "18",
            "TB_DESCRIPCION": "ENSACADORAS"
          },
          {
            "TB_ID_TIPOBIEN": "253",
            "TB_CVE_FAMILIA": "2",
            "TB_CVE_GENERICO": "16",
            "TB_CVE_DIVISION": "1",
            "TB_CVE_GRUPO": "4",
            "TB_CVE_SUBGRUPO": "0",
            "AGR_CVE_AGRUPADOR": "18",
            "TB_DESCRIPCION": "PALETIZADORAS"
          }
        ]
      };
      return of(result);
    }
    return this.getCatalogo('facturas/consulta_inventario');
  }

  validaExisteCliente(id) {
    if (this.dev) {
      const result = {
        "status": "success",
        "message": ". . : : Consulta Exitosa : : . .",
        "data": {
          "movimientos": [
            {
              "EXISTE": "1"
            }
          ]
        }
      };
      return of(result);
    }
    return this.getCatalogo('facturas/vcliente/'+id);
  }

  getBienesFactura(id) {
    if (this.dev) {
      const result = {
        "status" : "success",
        "message" : ". . : : Consulta Exitosa : : . .",
        "data" : {
          "movimientos" : [ {
            "FAC_ID_FACTURA" : "136",
            "INV_CVE_INVENTARIO" : "100",
            "INV_AUTORIZACION_BIEN" : "",
            "TB_CVE_FAMILIA" : "2",
            "TB_CVE_GENERICO" : "16",
            "TB_CVE_DIVISION" : "2",
            "TB_CVE_GRUPO" : "2"
          }, {
            "FAC_ID_FACTURA" : "136",
            "INV_CVE_INVENTARIO" : "100",
            "INV_AUTORIZACION_BIEN" : "",
            "TB_CVE_FAMILIA" : "2",
            "TB_CVE_GENERICO" : "16",
            "TB_CVE_DIVISION" : "2",
            "TB_CVE_GRUPO" : "2"
          } ]
        }
      };
      return of(result);
    }
    return this.getCatalogo('facturas/detalles/tipobien/'+id);
  }

  private getCatalogo(route) {
    let url = environment.urlApi3 + route;
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

  agregarInventario(form) {
    const data = {
      "user":"1",
      "role":"maker",
      "data":{
          "FAC_ID_FACTURA": form.id_factura,
          "INV_FEC": form.fecha_alta,
          "INV_CANTIDAD": form.items.length,
          "INV_IMP": form.importe,
          "INV_IVA": form.iva,
          "INV_STS": form.status,
          "NC_NUM": form.numero,
          "NC_IMP": form.importe_nota_credito,
          "NC_IVA": form.iva2,
          "INV_OBS": form.observaciones,
          "INV_TIPO_COMPRA": form.tipo,
          "INV_IMP_COMPRA": form.tipo_cambio,
          "INV_IVA_COMPRA": form.iva3,
          "INV_PRIMERA_RENTA": form.primera_renta,
          "INV_IVA_COSTO": form.iva_costo_adquisicion,
          "INV_AFORO": form.subprecio,
          "INV_VALOR_RESIDUAL": form.valor_residual,
          "INV_RENTAS_GAR": form.imp_rentas_garantia,
          "ITEMS": form.items
      }
    }
    console.log('AGREGAR INVENTARIO');
    console.log(data);

    let url = `${environment.urlApi3}facturas/alta/inventario_caracteristica`;
    return this.httpClient.post<HttpResponse<any>>(url, data).pipe(
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

  actualizarFactura(form) {
    const data = {
      "user":"1",
      "role":"maker",
      "data":{
          "FAC_ID_FACTURA": form.id_factura,
          "INV_FEC": form.fecha_alta,
          "INV_CANTIDAD": form.items.length,
          "INV_IMP": form.importe,
          "INV_IVA": form.iva,
          "INV_STS": form.status,
          "NC_NUM": form.numero,
          "NC_IMP": form.importe_nota_credito,
          "NC_IVA": form.iva2,
          "INV_OBS": form.observaciones,
          "INV_TIPO_COMPRA": form.tipo,
          "INV_IMP_COMPRA": form.tipo_cambio,
          "INV_IVA_COMPRA": form.iva3,
          "INV_PRIMERA_RENTA": form.primera_renta,
          "INV_IVA_COSTO": form.iva_costo_adquisicion,
          "INV_AFORO": form.subprecio,
          "INV_VALOR_RESIDUAL": form.valor_residual,
          "INV_RENTAS_GAR": form.imp_rentas_garantia,
          "ITEMS": form.items
      }
    }
    console.log('AGREGAR INVENTARIO');
    console.log(data);

    let url = `${environment.urlApi3}facturas/alta/inventario_caracteristica`;
    return this.httpClient.post<HttpResponse<any>>(url, data).pipe(
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

  bajaFactura(id) {
    console.log('FACTURA A ELIMINAR ', id);
    return this.getCatalogo(`facturas/bajafactura/${id}/3`);
  }

  updateChecker(data) {
    let url = `${environment.urlApi3}facturas/updatechecker/factura`;
    return this.httpClient.post<HttpResponse<any>>(url, data).pipe(
      map((m: any) => {
        console.log(m);
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
