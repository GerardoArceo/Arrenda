import { MonedasService } from 'src/app/servicios/monedas/monedas.service';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators }  from '@angular/forms';
import { Validaciones } from './../../validaciones';
import { ModelService } from './../../services/model.service';
import { Loading } from './../../modal/loading';
import { ValidaSesionService } from './../../login/validaSesion.service';
import { BaseComponent } from './../../base.component';
import { SnackbarService } from './../../../servicios/snackbar/snackbar.service';
import { DialogService } from './../../../servicios/dialog/dialog.service';
import { MonedasModel } from './../../../modelos/monedas/monedas.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './../../modal/modal.component';
import { BrowserStack } from 'protractor/built/driverProviders';

@Component({
  selector: 'app-alta-monedas',
  templateUrl: './alta-monedas.component.html',
  styleUrls: ['./alta-monedas.component.css']
})
export class AltaMonedasComponent extends BaseComponent implements OnInit {

  isChecker;
  gestion = 1;
  opcion = '';
  hideId = true;
  disabled  = false;
  required = false;
  gestionMigaja = '';
  MensajeModalAlta = 'Se agregará un nuevo registro';
  mensajeModal = `¿Está seguro de ${this.opcion} este registro?`;
  btnAddText = 'Guardar';
  //authorize = false;
  //approved: boolean = false;
  postData = {
    user: 1,
    role: 'maker',
    data: {},
    approved: false
  };
  resourceToUse;

  monedasForm: FormGroup = new FormGroup({});

  constructor(
    private _formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router,
    private sesion: ValidaSesionService, public dialog: MatDialog,
    private modelService: ModelService, private monedasService: MonedasService,
    private snackBarService: SnackbarService, public dialogService: DialogService
  ) { 
    super();
    this.monedasForm = this._formBuilder.group(new MonedasModel());

  }

  ngOnInit() {
    this.postData.role = this.sesion.getRol();
    this.isChecker = (this.sesion.getRol() == 'cheker' ? true : false);

    this.activatedRoute.params.subscribe(par => {
      if (par.gestion != null){
        this.setParametrosGestion(par.gestion);
      }
    });
    if (this.gestionMigaja != 'Alta'){
      Loading.show();
      this.getInfoForm();
    }
    if (this.isChecker == false){
      this.required = true;
      this.setValidaciones(this.monedasForm);
    }
  }

  getInfoForm(){
    const tmp = this.modelService.getData();
    if (tmp != null){
      this.temporalSubscription = this.monedasService.get(tmp).subscribe((res: any) => {
        if (res != undefined){
          let model = new MonedasModel(res);
          if (this.gestion == 1){
            model.cvemoneda = null;
            model.estatusmoneda = 0;
          }
          this.monedasForm = this._formBuilder.group(model);
          if (this.isChecker == false && this.gestion != 4){
            this.setValidaciones(this.monedasForm);
          }
        }
        Loading.hidden();
      }, (error: any) => {
        Loading.hidden();
      });
      this.Subscriptions.push(this.temporalSubscription);
    } else {
      Loading.hidden();
      this.router.navigate(['arrendadora/monedas']);
      this.dialogService.open({
        title: 'Error',
        test: 'No ha seleccionado un registro de la tabla',
        btnAcceptText: 'Aceptar',
        btnCancelText: ''
      });
    }
  }

  setParametrosGestion(gestion){
    switch (gestion) {
      case 'alta':
        this.gestion = 1;
        this.gestionMigaja = 'Alta';
        this.opcion = 'agregar';
        break;
      case 'editar':
        this.hideId = false;
        this.gestion = 2;
        this.gestionMigaja = 'Editar';
        this.opcion = 'actualizar';
        break;
      case 'borrar':
        this.hideId = false;
        this.btnAddText = 'Eliminar';
        this.gestion = 4;
        this.gestionMigaja = 'Borrar';
        this.disabled = true;
        this.opcion = 'eliminar';
        break;
    }
    this.mensajeModal = `¿Está seguro de ${this.opcion} este registro?`;
  }

  setValidaciones(form: FormGroup){
    if (this.gestion != 1){
      form.controls.cvemoneda.setValidators([Validators.required]);
    }         
    form.controls.nommoneda.setValidators([Validators.required, Validators.maxLength(36)]);
    form.controls.nomcortomoneda.setValidators([Validators.required, Validators.maxLength(3)]); 
    form.controls.obsmoneda.setValidators([Validators.maxLength(250)]);   
  }

  guardar() {
    this.monedasForm.updateValueAndValidity();
    if (this.monedasForm.valid) {
      const modal = this.dialog.open(ModalComponent, {
        width: '400px',
        data: {
          title: this.mensajeModal,
          text: 'Al aceptar no se podrá deshacer la acción',
          btnAcept: true,
          btnCancel: true
        },
      });
      modal.afterClosed().subscribe(result => {
        if (result) {   
          Loading.show();      
          this.GetSaveData();
          this.temporalSubscription = this.resourceToUse.subscribe(arg => {
            this.router.navigate(['arrendadora/monedas']);
            this.snackBarService.alertaSuccess('Operación realizada con éxito');
            Loading.hidden();
          }, (error) => {
            Loading.hidden();
            this.snackBarService.alertaError('Ocurrió un error al obtener la informcaión');
          });
          this.Subscriptions.push(this.temporalSubscription);
        }
      });
      //this.Subscriptions.push(this.temporalSubscription);
    } else {
      Loading.hidden();
      this.monedasForm.markAllAsTouched();
      this.monedasForm.updateValueAndValidity();
      this.dialog.open(ModalComponent, {
        width: '400px',
        data: {
          title: "Campos Requeridos",
          text: "Favor de completar los campos obligatorios",
          btnAcept: true,
          btnCancel: false
        },
      });
    }
  }

  private GetSaveData() {
    const formValue = this.monedasForm.value;
    
    switch (this.gestion) {
      case 1://alta
      this.postData = formValue;
      this.postData["estatusmoneda"] = 1;
      this.postData["activomoneda"] = 1;
      this.resourceToUse = this.monedasService.save(this.postData);
        break;
      case 2: //editar
      this.postData = formValue;
      this.postData["estatusmoneda"] = 1;
      this.resourceToUse = this.monedasService.update(this.postData);
        break;
      case 4: //borrar
        //data.push({ cvemoneda: formValue.cvemoneda });
        this.postData = formValue;       
        this.postData["estatusmoneda"] = 4; //BAJA LOGICA
        this.resourceToUse = this.monedasService.delete(this.postData);
        break;
      default:
        this.router.navigate(['arrendadora/monedas']);
        break;
    }   
  } 


}
