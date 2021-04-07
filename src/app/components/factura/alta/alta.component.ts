import { getMatScrollStrategyAlreadyAttachedError } from '@angular/cdk/overlay/scroll/scroll-strategy';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'src/app/servicios/dialog/dialog.service';
import { FacturaService } from 'src/app/servicios/factura/factura.service';
import { ModelService } from 'src/app/servicios/model/model.service';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { ValidaSesionService } from 'src/app/servicios/validaSesion/valida-sesion.service';
import { Loading } from 'src/app/utilities/Loading';
import { Validaciones } from 'src/app/validadores/Validaciones';
import { BaseComponent } from '../../base.component';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html'
})
export class AltaComponent extends BaseComponent implements OnInit {

  isChecker;

  // gestion = 1;
  // opcion = '';
  // hideId = true;
  // required = false;
  // gestionMigaja = '';
  // mensajeModal = `¿Está seguro de ${this.opcion} este registro?`;
  // approved: boolean = false;
  // resourceToUse;
  // authorize = false;
  // btnAddText = 'Guardar';
  
  nombreProveedor = '';
  disabled = false;
  empresaArray: any=[];

  facturaForm: FormGroup = new FormGroup({
    Id:new FormControl(),
    Factura: new FormControl(),
    Fecha:new FormControl(),
    Ncliente: new FormControl(),
    ClaveEmpresa:new FormControl(),
    ClaveProveedor: new FormControl()
  });

  proveedorNombreControl: FormControl = new FormControl();
  proveedorArray: any=[];

  constructor(
    private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router,
    private sesion: ValidaSesionService, public dialogService: DialogService,
    private modelService: ModelService, private snackBarService: SnackbarService,
    private facturaService: FacturaService
  ) {
    super();
  }

  ngOnInit(): void {
    this.isChecker = (this.sesion.getRol() == 'checker' ? true : false);

    if (this.isChecker == false) {
      this.setValidaciones(this.facturaForm);
    }
    this.setFormData();

    this.initCatalogos();
  }

  initCatalogos() {
    this.facturaService.getEmpresas().subscribe(a => {
      if (!a.data) {
        return;
      }
      this.empresaArray = a.data.movimientos.slice(0,2);
    });

    this.facturaService.getProveedores().subscribe(a => {
      const array = [];
      let i = 1;
      if (!a.data) {
        return;
      }
      for (const proveedor of a.data.movimientos) {
        array.push({IDX: i, ID: proveedor.PROV_CVE_PROVEEDOR, NAME: proveedor.PROV_NOM_PROVEEDOR});
        i++;
      }
      this.proveedorArray = array;
    });
  }

  setFormData() {
    if (!this.router.url.includes('clonar')) {
      return;
    }

    const tmp = this.modelService.getData();
    if (tmp != null) {
      const form = this.facturaForm.controls;
      form.Factura.setValue(tmp.CLAVE_FACTURA);
      form.Fecha.setValue(tmp.FECHA_ALTA.split(' ')[0]);
      form.Ncliente.setValue(tmp.NUMERO_CLIENTE);
      form.ClaveEmpresa.setValue(tmp.CLAVE_EMPRESA);
      form.ClaveProveedor.setValue(tmp.CLAVE_PROVEEDOR);
      this.proveedorNombreControl.setValue(tmp.NOMBRE_PROVEEDOR);
    } else {
      Loading.hide();
      this.router.navigate(['arrenda/facturaProveedor']);
      this.dialogService.open({
        title: 'Error',
        text: 'No ha seleccionado un registro de la tabla',
        btnAcceptText: 'Aceptar',
        btnCancelText: ''
      });
    }
  }

  setValidaciones(form: FormGroup) {
    form.controls.Factura.setValidators([Validators.required, Validators.maxLength(12)]);
    form.controls.Fecha.setValidators([Validators.required]);
    form.controls.Ncliente.setValidators([Validators.required, Validaciones.numerico]);
    form.controls.ClaveEmpresa.setValidators([Validators.required, Validaciones.numerico, Validaciones.customMin(1, 'Seleccione una empresa')]);
    form.controls.ClaveProveedor.setValidators([Validators.required]);
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

  guardarFactura() {
    this.facturaForm.updateValueAndValidity();
    (<any>Object).values(this.facturaForm.controls).forEach(control => {
      control.markAsDirty();
      control.markAsTouched();
    });
    if (!this.facturaForm.valid) {
      return;
    }

    const formValue = this.facturaForm.value;

    Loading.show();
    this.facturaService.validaExisteCliente(formValue.Ncliente).subscribe(a => {
      Loading.hide();
      const EXISTE = a.data.movimientos[0].EXISTE;
      if (EXISTE !== '1') {
        this.dialogService.open({
          title: 'Error',
          text: 'El número de cliente no existe',
          btnAcceptText: 'Aceptar',
          btnCancelText: ''
        });
        return;
      }

      const data = {
        clave_factura: formValue.Factura,
        fecha_alta: this.formatDate(formValue.Fecha),
        numero_cliente: formValue.Ncliente,
        clave_empresa: formValue.ClaveEmpresa,
        clave_provedor: formValue.ClaveProveedor
      };
  
      const postData = {
        user: 1,
        role: this.sesion.getRol(),
        data,
        approved: false
      };
      
      const opts = {
        title: 'Confirmación',
        text: '¿Desea dar de alta la factura?',
      }
      this.dialogService.openPopUp(opts);
      this.dialogService.confirmPopUp().subscribe(result => {
        if (result) {
          Loading.show();
          this.facturaService.altaFactura(postData).subscribe(arg => {
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
    });
  
  }

  proveedor_OnSelect(response){
    if(response!=null){
      this.facturaForm.controls.ClaveProveedor.setValue(response.ID);
      this.proveedorNombreControl.setValue(response.NAME);
    } else {
      this.facturaForm.controls.ClaveProveedor.setValue(null);
      this.proveedorNombreControl.setValue(null);
    }
  }

  // setParametrosGestion(gestion) {
  //   switch (gestion) {
  //     case 'alta':
  //       this.gestion = 1;
  //       this.gestionMigaja = 'Alta';
  //       this.opcion = 'agregar';
  //       break;
  //     case 'clonar':
  //       this.gestion = 1;
  //       this.gestionMigaja = 'Clonar';
  //       this.opcion = 'clonar';
  //       break;
  //   }
  //   this.mensajeModal = `¿Está seguro de ${this.opcion} este registro?`;
  // }

  // guardar() {
  //   this.facturaForm.updateValueAndValidity();
  //   if (this.facturaForm.valid) {
  //     this.dialogService.open({
  //       title: this.mensajeModal,
  //       text: 'Al aceptar no se podrá deshacer la acción',
  //       btnAcceptText: 'Aceptar',
  //       // btnCancelText: 'Cancelar'
  //     });
  //     this.temporalSubscription = this.dialogService.confirm().subscribe(res => {
  //       if (res == true) {
  //         Loading.show();
  //         this.GetSaveData();
  //         this.temporalSubscription = this.resourceToUse.subscribe(arg => {
  //           if (arg.status == 'success') {
  //             this.router.navigate(['arrenda/facturaProveedor']);
  //             this.snackBarService.alertaSuccess('Operación realizada con éxito');
  //           } else {
  //             this.snackBarService.alertaError(arg.message);
  //           }
  //           Loading.hide();
  //         }, (error) => {
  //           Loading.hide();
  //           this.snackBarService.alertaError('Ocurrió un error ' + error.statusText);
  //         });
  //         this.Subscriptions.push(this.temporalSubscription);
  //       }
  //     });
  //     this.Subscriptions.push(this.temporalSubscription);
  //   } else {
  //     Loading.hide();
  //     this.facturaForm.markAllAsTouched();
  //     this.facturaForm.updateValueAndValidity();
  //     this.dialogService.open({
  //       title: 'Campos Requeridos',
  //       text: 'Favor de completar los campos obligatorios',
  //       btnAcceptText: 'Aceptar',
  //       btnCancelText: ''
  //     });
  //   }
  // }


  // private GetSaveData() {
  //   const formValue = this.facturaForm.value;

  //   if (this.gestion === 1) {
  //     this.postData.data = {
  //       clave_factura: formValue.Factura,
  //       fecha_alta: formValue.Fecha.substring(2),
  //       numero_cliente: formValue.Ncliente,
  //       clave_empresa: formValue.ClaveEmpresa,
  //       clave_provedor: formValue.ClaveProveedor
  //     };
  //     this.resourceToUse = this.facturaService.save(this.postData);
  //     return;
  //   }

  //   // formValue.NSTATUS_ID=parseInt(formValue.NSTATUS_ID);

  //   let data = {};
  //   if (this.gestion == 4) {
  //     data = { NCALIFICACION_ID: formValue.NCALIFICACION_ID };
  //     this.postData.data = data;
  //     this.resourceToUse = this.facturaService.delete(this.postData);
  //     return;
  //   }
  //   switch (formValue.NSTATUS_ID) {
  //     case 0:
  //     case 2:
  //     case 6:
  //     case 7:
  //     case 8:
  //     case 9:
  //       this.postData.data = formValue;
  //       this.resourceToUse = this.facturaService.save(this.postData);
  //       if (this.gestion == 2) {
  //         this.resourceToUse = this.facturaService.edit(this.postData);
  //       }
  //       break;
  //     case 1:
  //       this.postData.approved = this.approved;
  //       data = { NCALIFICACION_ID: formValue.NCALIFICACION_ID, NSTATUS_ID: formValue.NSTATUS_ID };
  //       this.postData.data = data;
  //       this.resourceToUse = this.facturaService.authorize(this.postData);
  //       break;
  //     case 3:
  //       this.postData.approved = this.approved;
  //       data = { NCALIFICACION_ID: formValue.NCALIFICACION_ID, NSTATUS_ID: formValue.NSTATUS_ID };
  //       this.postData.data = data;
  //       this.resourceToUse = this.facturaService.bajaChecker(this.postData);
  //       break;
  //     case 5:
  //       this.postData.approved = this.approved;
  //       data = { NCALIFICACION_ID: formValue.NCALIFICACION_ID, NSTATUS_ID: formValue.NSTATUS_ID };
  //       this.postData.data = data;
  //       this.resourceToUse = this.facturaService.cambioChecker(this.postData);
  //       break;
  //   }
  // }
}
