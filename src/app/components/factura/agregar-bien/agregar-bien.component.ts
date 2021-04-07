import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/servicios/dialog/dialog.service';
import { FacturaService } from 'src/app/servicios/factura/factura.service';
import { ModelService } from 'src/app/servicios/model/model.service';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { ValidaSesionService } from 'src/app/servicios/validaSesion/valida-sesion.service';
import { Loading } from 'src/app/utilities/Loading';

@Component({
  selector: 'app-agregar-bien',
  templateUrl: './agregar-bien.component.html',
})
export class AgregarBienComponent implements OnInit {

  firstForm: FormGroup;
  bienesForm: FormGroup;

  bienes: any = [];
  monedas: any = [];
  catalogoTipoCompra: any = [{ID: '0', NAME: 'Sin opción'}, {ID: '1', NAME: 'Arrendatario'}];

  factura;

  items: any = [];
  items2: any = [];
  columnsItem = [];
  @ViewChild('accionTemplate', { static: true }) accionTemplate: TemplateRef<any>;

  addMode = false;
  editMode = false;
  checkerMode = false;

  constructor(private formBuilder: FormBuilder,
    private dialogService: DialogService,
    private facturaService: FacturaService,
    private modelService: ModelService,
    private router: Router,
    private snackBarService: SnackbarService,
    private sesion: ValidaSesionService
    ) { }

  ngOnInit(): void {
    this.initForms();
    this.initCatalogos();
    this.initItemsTable();

    if (this.router.url.includes('agregarBienes')) {
      this.addMode = true;
    }
    if (this.router.url.includes('editar')) {
      this.editMode = true;
      this.fillFacturaData();
    }
    if (this.router.url.includes('autorizar')) {
      this.checkerMode = this.sesion.getRol() == 'checker' ? true : false;
      this.fillFacturaData();
    }

    this.facturaService.getInventario().subscribe(a => {
      if (!a.data) {
        return;
      }
      this.bienes = a.data;
    });
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    let day: any = date.getDate()
    let month: any = date.getMonth() + 1
    let year = String(date.getFullYear()).substring(2)
    if((String(day)).length==1) day='0'+day;
    if((String(month)).length==1) month='0'+month;
    return `${day}-${month}-${year}`;
  }

  initForms() {
    this.factura = this.modelService.getData();

    if (!this.factura) {
      this.router.navigate(['arrenda/facturaProveedor']);
      this.dialogService.open({
        title: 'Error',
        text: 'No ha seleccionado un registro de la tabla',
        btnAcceptText: 'Aceptar',
        btnCancelText: ''
      });
      return;
    }

    this.firstForm = this.formBuilder.group({
      id_factura: [this.factura.ID_FACTURA, []],
      clave_factura: [this.factura.CLAVE_FACTURA, []],
      clave_proveedor: [this.factura.CLAVE_PROVEEDOR, []],
      nombre_proveedor: [this.factura.NOMBRE_PROVEEDOR, []],
      consec_factura: ['', [Validators.required]],
      consec_anexo: ['', [Validators.required]],
      status: [this.factura.ESTATUS, []],
      moneda: ['1', [Validators.required]],
      aut_tipo_cambio: ['', []],
      tipo_cambio: ['', []],
      fecha_alta: [this.factura.FECHA_ALTA.split(' ')[0], [Validators.required]],
      importe: ['', [Validators.required]],
      iva: ['', [Validators.required]],

      numero: ['', []],
      importe_nota_credito: ['', []],
      iva2: ['', []],
      observaciones: ['', []],

      tipo: ['0', [Validators.required]],
      importe_compra: ['', []],
      iva3: ['', []],
      primera_renta: ['', [Validators.required]],
      iva_costo_adquisicion: ['', []],
      subprecio: ['', []],
      valor_residual: ['', []],
      imp_rentas_garantia: ['', []],
    });
  }

  initCatalogos() {
    this.facturaService.getMonedas().subscribe(a => {
      if (!a.data) {
        return;
      }
      this.monedas = a.data.movimientos;
    });
  }

  initItemsTable() {
    this.columnsItem = [
      { campo: 'CLAVE_PROVEEDOR', titulo: 'Cve. Prov.', cellTemplate: null },
      { campo: 'ID_FACTURA', titulo: 'Id Factura', cellTemplate: null },
      { campo: 'CLAVE_FACTURA', titulo: 'Cve. Factura', cellTemplate: null },
      { campo: 'TB_CVE_FAMILIA', titulo: 'Familia', cellTemplate: null },
      { campo: 'TB_CVE_GENERICO', titulo: 'Género', cellTemplate: null },
      { campo: 'TB_CVE_DIVISION', titulo: 'División', cellTemplate: null },
      { campo: 'TB_CVE_GRUPO', titulo: 'Grupo', cellTemplate: null },
      { campo: 'TB_DESCRIPCION', titulo: 'Descripción', cellTemplate: null },
      { campo: null, titulo: 'Acciones', cellTemplate: this.accionTemplate },
    ];
  }

  firstFormButton(stepper) {
    (<any>Object).values(this.firstForm.controls).forEach(control => {
      control.markAsDirty();
      control.markAsTouched();
    });

    if (!this.firstForm.valid) {
      return;
    }
    stepper.next();
  }

  stepperPrevious(stepper) {
    stepper.previous();
  }

  openModalAgregarBien() {
    const dataSource = this.bienes;
    const additionalColumns = [
      { field: 'TB_CVE_DIVISION', title: 'Divisón'},
      { field: 'TB_CVE_GRUPO', title: 'Grupo'},
      { field: 'TB_CVE_SUBGRUPO', title: 'Subgrupo'},
      { field: 'AGR_CVE_AGRUPADOR', title: 'Agrupador'},
      { field: 'TB_DESCRIPCION', title: 'Descripción'},
    ];
    this.dialogService.openSeleccion({
      title: `Bienes`,
      text: '',
      btnCloseText: 'Cerrar',
      dataSource,
      firstField: 'TB_CVE_FAMILIA',
      secondField: 'TB_CVE_GENERICO',
      firstFieldTitle: 'Familia',
      secondFieldTitle: 'Genero',
      additionalColumns
    });
    this.dialogService.confirmSeleccion().subscribe(bien => {
      if (bien != null && bien !== false) {
        delete bien.itemToSave;
        bien.editMode = false;
        this.openModalCaracteristicasBien(bien);
      }
    });
  }

  openModalCaracteristicasBien(bien) {
    this.dialogService.openGuardarBien({
      title: 'Características',
      bien
    });

    this.dialogService.confirmBien().subscribe(result => {
      if (result) {
        if (!result.editMode) {
          const item = {...result, INDEX:  Math.random().toString().replace("0.", "") };
          this.items.push(item);
          this.items2 = [... this.items];
          this.items2 = this.items2.map(i => {
            i.CLAVE_PROVEEDOR = this.factura.CLAVE_PROVEEDOR;
            i.ID_FACTURA = this.factura.ID_FACTURA;
            i.CLAVE_FACTURA = this.factura.CLAVE_FACTURA;
            return i;
          });
        }
      }
    });
  }

  guardar() {
    (<any>Object).values(this.firstForm.controls).forEach(control => {
      control.markAsDirty();
      control.markAsTouched();
    });

    if (!this.firstForm.valid) {
      this.dialogService.open({
        title: 'Error',
        text: 'El formulario no se ha llenado correctamente',
        btnAcceptText: 'Aceptar',
        btnCancelText: ''
      });
      return;
    }
    const data = {... this.firstForm.value};
    data.items = this.items.map(i => {
      const item = i.itemToSave;
      item.CARACTERISTICAS = item.CARACTERISTICAS.map(c => {
        delete c.CRC_DESC_CARACTERISTICA;
        return c;
      });
      return item;
    });
    data.fecha_alta = this.formatDate(data.fecha_alta);
    data.primera_renta = this.formatDate(data.primera_renta);

    const opts = {
      title: 'Confirmación',
      text: '¿Desea guardar la factura?',
    }
    this.dialogService.openPopUp(opts);
    this.dialogService.confirmPopUp().subscribe(result => {
      if (result) {
        Loading.show();

        let operacion;
        if (this.editMode) {
          operacion = this.facturaService.actualizarFactura(data);
        } else {
          operacion = this.facturaService.agregarInventario(data);
        }

        operacion.subscribe(arg => {
          if (arg.status == 'success') {
            this.router.navigate(['arrenda/facturaProveedor']);
            this.snackBarService.alertaSuccess('Operación realizada con éxito');
          } else {
            this.snackBarService.alertaError(arg.message);
          }
          Loading.hide();
        }, (error) => {
          Loading.hide();
          this.snackBarService.alertaError('Ocurrió un error ' + error.statusText);
        });
      }
    });
  }

  validarCambios() {
    const data = {
      id_factura: this.factura.ID_FACTURA,
      status: "3"
    };

    const postData = {
      user: 1,
      role: this.sesion.getRol(),
      data,
      approved: false
    };

    this.facturaService.updateChecker(postData).subscribe(arg => {
      console.log(arg);
      if (arg.status == 'success') {
        this.router.navigate(['arrenda/facturaProveedor']);
        this.snackBarService.alertaSuccess('Operación realizada con éxito');
      } else {
        this.snackBarService.alertaError(arg.message);
      }
    });
  }

  rechazarCambios() {
    this.router.navigate(['arrenda/facturaProveedor']);
    this.snackBarService.alertaSuccess('Operación realizada con éxito');
  }

  eliminarItem(item) {
    console.log(this.items);
    this.items = this.items.filter(i => i.INDEX !== item.INDEX);
    this.items2 = [... this.items];
  }

  editarItem(item) {
    item.editMode = true;
    this.openModalCaracteristicasBien(item);
  }

  fillFacturaData() {
    this.facturaService.getDetalleFactura(this.factura.ID_FACTURA).subscribe(a => {
      if (!a.data) {
        return;
      }
      const r = a.data.movimientos[0];
      if (!r) {
        return;
      }
      this.factura = {...this.factura, ...r};

      const form = this.firstForm.controls;

      form.consec_factura.setValue('');
      form.consec_anexo.setValue('');
      form.moneda.setValue(this.factura.NOMBRE_MONEDA);
      form.aut_tipo_cambio.setValue(this.factura.AUT_TIPO_CAMBIO);
      form.tipo_cambio.setValue(this.factura.TIPO_CAMBIO);
      form.importe.setValue(this.factura.IMPORTE);
      form.iva.setValue(this.factura.IMPORTE);
      form.numero.setValue(this.factura.NUMERO_NOTA_CREDITO);
      form.importe_nota_credito.setValue(this.factura.IMPORTE_NOTA_CREDITO);
      form.iva2.setValue(this.factura.IVA_NOTA_CREDITO);
      form.observaciones.setValue(this.factura.OBSERVACIONES);
      form.tipo.setValue(this.factura.TIPO_COMPRA);
      form.importe_compra.setValue(this.factura.IMPORTE_COMPRA);
      form.iva3.setValue(this.factura.IVA_COMPRA);
      form.primera_renta.setValue(this.factura.PRIMERA_RENTA.split(' ')[0]);
      form.iva_costo_adquisicion.setValue(this.factura.IVA_COSTO_ADQUISICION);
      form.subprecio.setValue(this.factura.IVA_COSTO_ADQUISICION);
      form.valor_residual.setValue(this.factura.VALOR_RESIDUAL);
      form.imp_rentas_garantia.setValue(this.factura.RENTA);
    });

    this.facturaService.getBienesFactura(this.factura.ID_FACTURA).subscribe(a => {
      if (!a.data) {
        return;
      }
      this.items = a.data.movimientos.map(item => {
        item.CLAVE_PROVEEDOR = this.factura.CLAVE_PROVEEDOR;
        item.ID_FACTURA = this.factura.ID_FACTURA;
        item.CLAVE_FACTURA = this.factura.CLAVE_FACTURA;
        return item;
      });
      this.items2 = [... this.items];
    });
  }
}
