import { ElementRef, Renderer2 } from '@angular/core';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from 'src/app/servicios/dialog/dialog.service';
import { FacturaService } from 'src/app/servicios/factura/factura.service';
import { ModelService } from 'src/app/servicios/model/model.service';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { ValidaSesionService } from 'src/app/servicios/validaSesion/valida-sesion.service';
import { Loading } from 'src/app/utilities/Loading';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
})
export class FacturaComponent extends BaseComponent implements OnInit {

  columns: Array<any>;
  dataSource: MatTableDataSource<any> = new MatTableDataSource([]);
  @ViewChild('accionTemplate', { static: true }) accionTemplate: TemplateRef<any>;

  columns2: Array<any>;
  dataSource2: MatTableDataSource<any> = new MatTableDataSource([]);
  @ViewChild('accionTemplate2', { static: true }) accionTemplate2: TemplateRef<any>;

  facturasCargaMasiva;

  isChecker;
  searchValue: string = '';
  showCargaMasiva = false;
  @ViewChild('masivaFile', { static: true }) masivaFile: ElementRef<HTMLElement>;
  @ViewChild('importeTemplate', { static: true }) importeTemplate: TemplateRef<any>;

  constructor(
    private sesion: ValidaSesionService, public dialogService: DialogService,
    private alertService: SnackbarService, public modelService: ModelService,
    private facturaService: FacturaService, private renderer2: Renderer2,
    private snackBarService: SnackbarService,
  ) {
    super();
   }

  ngOnInit(): void {
    this.isChecker = this.sesion.getRol() == 'checker' ? true : false;
    this.getTableColums();

    Loading.show();
    this.temporalSubscription = this.facturaService.getFacturas().subscribe((res: any) => {
      if (res.status == 'success' && res.data) {
        res.data = res.data.movimientos.map(m => {
          m.BIENES = m.BIENES || 0;
          m.IMPORTE = m.IMPORTE || 0;
          m.IVA = m.IVA || 0;
          m.TOTAL = m.TOTAL || 0;
          m.FECHA_ALTA = m.FECHA_ALTA.split(' ')[0];
          return m;
        });

        let facturas = res.data.sort((a,b) => (Number(a.ID_FACTURA) > Number(b.ID_FACTURA)) ? -1 : ((Number(b.ID_FACTURA) > Number(a.ID_FACTURA)) ? 1 : 0))
        
        this.facturasCargaMasiva = facturas;

        this.dataSource = new MatTableDataSource(facturas);        
        Loading.hide();
      } else {
        this.alertService.alertaError('No hay datos disponibles');
        Loading.hide();
      }
    }, (error) => {
      this.alertService.alertaError('Ocurrió un problema al realizar la petición');
      Loading.hide();
    });
    this.Subscriptions.push(this.temporalSubscription);
  }

  getTableColums() {
    this.columns = [
      { campo: 'CLAVE_FACTURA', titulo: 'Factura', cellTemplate: null },
      { campo: 'FECHA_ALTA', titulo: 'Fecha Alta', cellTemplate: null },
      { campo: 'NUMERO_CLIENTE', titulo: '# Cliente', cellTemplate: null },
      { campo: 'CLAVE_EMPRESA', titulo: 'Clave Empresa', cellTemplate: null },
      { campo: 'NOMBRE_PROVEEDOR', titulo: 'Proveedor', cellTemplate: null },
      { campo: 'NOMBRE_MONEDA', titulo: 'Moneda', cellTemplate: null },
      { campo: 'BIENES', titulo: '# Bienes', cellTemplateå: null },
      { campo: 'IMPORTE', titulo: 'Importe', cellTemplate: this.importeTemplate },
      { campo: 'IVA', titulo: 'IVA', cellTemplate: this.importeTemplate },
      { campo: 'TOTAL', titulo: 'Total', cellTemplate: this.importeTemplate },
      { campo: 'TIPO_CAMBIO', titulo: 'Tipo de Cambio', cellTemplate: null },
    ];

    this.columns2 = [...this.columns];
    this.columns.push({ campo: null, titulo: 'Acciones', cellTemplate: this.accionTemplate });
    this.columns2.push({ campo: null, titulo: 'Acciones', cellTemplate: this.accionTemplate2 });
  }

  eliminar(element) {
    const opts = {
      title: 'Confirmación',
      text: '¿Seguro que desea eliminar el registro?',
    }
    this.dialogService.openPopUp(opts);

    this.dialogService.confirmPopUp().subscribe(result => {
      if (result) {
        this.facturaService.bajaFactura(element.ID_FACTURA).subscribe(arg => {
          if (arg.status == 'success') {
            this.snackBarService.alertaSuccess('Operación realizada con éxito');
            this.ngOnInit();
          } else {
            this.snackBarService.alertaError(arg.message);
          }
        });
      }
    });
  }

  btnCargaMasiva() {
    let el: HTMLElement = this.masivaFile.nativeElement;
    this.renderer2.setProperty(el, 'value', null);
    el.click();
  }

  btnDescargaPlantilla() {
    this.facturaService.getPlantilla();
  }

  fileLoaded(fileInput: any){
    this.showCargaMasiva = true;
    this.dataSource2 = new MatTableDataSource(this.facturasCargaMasiva);        
  }

  eliminarRegistroCargar(factura) {
    this.facturasCargaMasiva = this.facturasCargaMasiva.filter(f => f.ID_FACTURA !== factura.ID_FACTURA);
    this.dataSource2 = new MatTableDataSource(this.facturasCargaMasiva);        
  }

  saveCargaMasiva() {
    const opts = {
      title: 'Confirmación',
      text: '¿Seguro que desea agregar los registros?',
    }
    this.dialogService.openPopUp(opts);

    this.dialogService.confirmPopUp().subscribe(result => {
      if (result) {
        this.facturaService.bajaFactura(0).subscribe(arg => {
          if (arg.status == 'success') {
            this.snackBarService.alertaSuccess('Operación realizada con éxito');
            this.ngOnInit();
          } else {
            this.snackBarService.alertaError(arg.message);
          }
        });
      }
    });
  }

  cancelCargaMasiva() {
    this.facturasCargaMasiva = [];
    this.dataSource2 = new MatTableDataSource([]);
    this.showCargaMasiva = false;
  }

  // gestionBtn(element) {
  //   this.modelService.setData(element.NFACTURACION_ID);
  // }

  // gestionAgregarBien(element){
  //   this.modelService.setExtraData({agregarBien:true});
  //   this.modelService.setData(element);
  // }

  // gestionEditar(element){
  //   this.modelService.setExtraData({agregarBien:false});
  //   this.modelService.setData(element);
  // }

  // gestionBloqueadoEditar(element) {
  //   this.gestionBloqueado(element);
  // }

  // gestionBloqueadoBorrar(element) {
  //   this.gestionBloqueado(element);
  // }

  // gestionBloqueado(element) {
  //   // if (element.CESTATUS == 1) {
  //   //   this.dialogService.open({
  //   //     title: 'FIVE',
  //   //     text: `No se puede ${gestion} este registro hasta que el usuario con rol Checker lo autorice o rechace`,
  //   //     btnAcceptText: 'Aceptar',
  //   //     btnCancelText: ''
  //   //   });
  //   // } else {
  //     this.gestionBtn(element);
  //   // }
  // }

}
