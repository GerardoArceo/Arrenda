import { EndosoService } from 'src/app/servicios/endoso/endoso.service';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators }  from '@angular/forms';
import { Validaciones } from './../../validaciones';
import { ModelService } from './../../services/model.service';
import { Loading } from './../../modal/loading';
import { ValidaSesionService } from './../../login/validaSesion.service';
import { BaseComponent } from './../../base.component';
import { SnackbarService } from './../../../servicios/snackbar/snackbar.service';
import { DialogService } from './../../../servicios/dialog/dialog.service';
import { EndosoModel } from './../../../modelos/endoso/endoso.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './../../modal/modal.component';
import { BrowserStack } from 'protractor/built/driverProviders';

@Component({
  selector: 'app-alta-endoso',
  templateUrl: './alta-endoso.component.html',
  styleUrls: ['./alta-endoso.component.css']
})
export class AltaEndosoComponent extends BaseComponent implements OnInit {

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

  endosoForm: FormGroup = new FormGroup({});

  constructor(
    private _formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router,
    private sesion: ValidaSesionService, public dialog: MatDialog,
    private modelService: ModelService, private endosoService: EndosoService,
    private snackBarService: SnackbarService, public dialogService: DialogService
  ) { 
    super();
    this.endosoForm = this._formBuilder.group(new EndosoModel());

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
      this.setValidaciones(this.endosoForm);
    }
  }

  getInfoForm(){
    const tmp = this.modelService.getData();
    if (tmp != null){
      this.temporalSubscription = this.endosoService.get(tmp).subscribe((res: any) => {
        if (res != undefined){
          let model = new EndosoModel(res);
          if (this.gestion == 1){
            model.cveendoso = null;
            model.estatusendoso = 0;
          }
          this.endosoForm = this._formBuilder.group(model);
          if (this.isChecker == false && this.gestion != 4){
            this.setValidaciones(this.endosoForm);
          }
        }
        Loading.hidden();
      }, (error: any) => {
        Loading.hidden();
      });
      this.Subscriptions.push(this.temporalSubscription);
    } else {
      Loading.hidden();
      this.router.navigate(['arrendadora/endoso']);
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
      form.controls.cveendoso.setValidators([Validators.required]);
    }         
    form.controls.descendoso.setValidators([Validators.required, Validators.maxLength(36)]);
    form.controls.obsendoso.setValidators([Validators.maxLength(250)]);   
  }

  guardar() {
    this.endosoForm.updateValueAndValidity();
    if (this.endosoForm.valid) {
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
            this.router.navigate(['arrendadora/endoso']);
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
      this.endosoForm.markAllAsTouched();
      this.endosoForm.updateValueAndValidity();
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
    const formValue = this.endosoForm.value;
    
    switch (this.gestion) {
      case 1://alta
      this.postData = formValue;
      this.postData["estatusendoso"] = 1;
      this.postData["activoendoso"] = 1;
      this.resourceToUse = this.endosoService.save(this.postData);
        break;
      case 2: //editar
      this.postData = formValue;
      this.postData["estatusendoso"] = 1;
      this.resourceToUse = this.endosoService.update(this.postData);
        break;
      case 4: //borrar
        this.postData = formValue;       
        this.postData["estatusendoso"] = 4; //BAJA LOGICA
        this.resourceToUse = this.endosoService.delete(this.postData);
        break;
      default:
        this.router.navigate(['arrendadora/endoso']);
        break;
    }   
  } 


}
