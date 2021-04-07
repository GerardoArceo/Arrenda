import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/servicios/dialog/dialog.service';
import { FacturaService } from 'src/app/servicios/factura/factura.service';
import { ModelService } from 'src/app/servicios/model/model.service';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { ValidaSesionService } from 'src/app/servicios/validaSesion/valida-sesion.service';
import { Loading } from 'src/app/utilities/Loading';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'app-ver-detalle',
  templateUrl: './ver-detalle.component.html',
  styleUrls: ['./ver-detalle.component.css']
})
export class VerDetalleComponent extends BaseComponent implements OnInit {

  factura: any;
  columnsItem = [
    { campo: 'INV_CVE_INVENTARIO', titulo: 'Cve. Inv.', cellTemplate: null },
    { campo: 'CLAVE_PROVEEDOR', titulo: 'Cve. Prov.', cellTemplate: null },
    { campo: 'ID_FACTURA', titulo: 'Id Factura', cellTemplate: null },
    { campo: 'CLAVE_FACTURA', titulo: 'Cve. Factura', cellTemplate: null },
    { campo: 'TB_CVE_FAMILIA', titulo: 'Familia', cellTemplate: null },
    { campo: 'TB_CVE_GENERICO', titulo: 'Género', cellTemplate: null },
    { campo: 'TB_CVE_DIVISION', titulo: 'División', cellTemplate: null },
    { campo: 'TB_CVE_GRUPO', titulo: 'Grupo', cellTemplate: null },
  ];

  constructor(
    private router: Router,
    private sesion: ValidaSesionService, public dialogService: DialogService,
    private modelService: ModelService, private snackBarService: SnackbarService,
    private facturaService: FacturaService
  ) {
    super();
  }

  ngOnInit(): void {
    this.factura = this.modelService.getData();
    if (this.factura == null) {
      Loading.hide();
      this.router.navigate(['arrenda/facturaProveedor']);
      this.dialogService.open({
        title: 'Error',
        text: 'No ha seleccionado un registro de la tabla',
        btnAcceptText: 'Aceptar',
        btnCancelText: ''
      });
      return;
    }
    this.getFacturaData();
    this.getBienesFactura();
  }

  getFacturaData() {
    this.facturaService.getDetalleFactura(this.factura.ID_FACTURA).subscribe(a => {
      if (!a.data) {
        return;
      }
      const r = a.data.movimientos[0];
      this.factura = {...this.factura, ...r};
    });
  }

  getBienesFactura() {
    this.facturaService.getBienesFactura(this.factura.ID_FACTURA).subscribe(a => {
      if (!a.data) {
        return;
      }
      this.factura.items = a.data.movimientos.map(item => {
        item.CLAVE_PROVEEDOR = this.factura.CLAVE_PROVEEDOR;
        item.ID_FACTURA = this.factura.ID_FACTURA;
        item.CLAVE_FACTURA = this.factura.CLAVE_FACTURA;
        return item;
      });
    });
  }
}
