import { ModalComponent } from './../../modal/modal.component';
import { DialogService } from 'src/app/servicios/dialog/dialog.service';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { ValidaSesionService } from './../../login/validaSesion.service';
import { Loading } from './../../modal/loading';
import { ModelService } from './../../services/model.service';
import { Validaciones } from './../../validaciones';
import { GrupoConceptoModel } from './../../../modelos/grupo-concepto/grupo-concepto.model';
import { GrupoConceptoService } from 'src/app/servicios/grupo-concepto/grupo-concepto.service';
import { BaseComponent } from './../../base.component';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators }  from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-alta-grupo-concepto',
  templateUrl: './alta-grupo-concepto.component.html',
  styleUrls: ['./alta-grupo-concepto.component.css']
})
export class AltaGrupoConceptoComponent extends BaseComponent implements OnInit {

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
  postData = {
    user: 1,
    role: 'maker',
    data: {},
    approved: false
  };
  resourceToUse;
  grupoConceptoForm: FormGroup = new FormGroup({});

  constructor(
    private _formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router,
    private sesion: ValidaSesionService, public dialog: MatDialog,
    private modelService: ModelService, private grupoConceptoService: GrupoConceptoService,
    private snackBarService: SnackbarService, public dialogService: DialogService
  ) { 
    super();
    this.grupoConceptoForm = this._formBuilder.group(new GrupoConceptoModel());
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
      this.setValidaciones(this.grupoConceptoForm);
    }
  }

  getInfoForm(){
    const tmp = this.modelService.getData();
    if (tmp != null){
      this.temporalSubscription = this.grupoConceptoService.get(tmp).subscribe((res: any) => {
        if (res != undefined){
          let model = new GrupoConceptoModel(res);
          if (this.gestion == 1){
            model.cvegrupoconcepto = null;
            model.gcestatus = 0;
          }
          this.grupoConceptoForm = this._formBuilder.group(model);
          if (this.isChecker == false && this.gestion != 4){
            this.setValidaciones(this.grupoConceptoForm);
          }
        }
        Loading.hidden();
      }, (error: any) => {
        Loading.hidden();
      });
      this.Subscriptions.push(this.temporalSubscription);
    } else {
      Loading.hidden();
      this.router.navigate(['arrendadora/grupo-concepto']);
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
      form.controls.cvegrupoconcepto.setValidators([Validators.required]);
    }  
    form.controls.gcgrupo.setValidators([Validators.required, Validators.maxLength(10)]);       
    form.controls.gcconcepto.setValidators([Validators.required, Validators.maxLength(4)]);
    form.controls.gcdescripcion.setValidators([Validators.required, Validators.maxLength(36)]);     
  }
  
  guardar() {
    this.grupoConceptoForm.updateValueAndValidity();
    if (this.grupoConceptoForm.valid) {
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
            this.router.navigate(['arrendadora/grupo-concepto']);
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
      this.grupoConceptoForm.markAllAsTouched();
      this.grupoConceptoForm.updateValueAndValidity();
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
    const formValue = this.grupoConceptoForm.value;
    
    switch (this.gestion) {
      case 1://alta
      this.postData = formValue;
      this.postData["gcestatus"] = 1;      
      this.resourceToUse = this.grupoConceptoService.save(this.postData);
        break;
      case 2: //editar
      this.postData = formValue;
      this.postData["gcestatus"] = 1;
      this.resourceToUse = this.grupoConceptoService.update(this.postData);
        break;
      case 4: //borrar        
        this.postData = formValue;       
        this.postData["gcestatus"] = 4; //BAJA LOGICA
        this.resourceToUse = this.grupoConceptoService.delete(this.postData);
        break;
      default:
        this.router.navigate(['arrendadora/grupo-concepto']);
        break;
    }   
  } 


}
