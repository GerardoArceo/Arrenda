import { EjecutivosService } from './../../../servicios/ejecutivos/ejecutivos.service';
import { EjecutivosModel } from './../../../modelos/ejecutivos/ejecutivos.model';
import { BaseComponent } from './../../base.component';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidaSesionService } from '../../login/validaSesion.service';
import { MatDialog } from '@angular/material/dialog';
import { ModelService } from '../../services/model.service';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { DialogService } from 'src/app/servicios/dialog/dialog.service';
import { Loading } from '../../modal/loading';
import { Validaciones } from '../../validaciones';
import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: 'app-alta-ejecutivos',
  templateUrl: './alta-ejecutivos.component.html',
  styleUrls: ['./alta-ejecutivos.component.css']
})
export class AltaEjecutivosComponent extends BaseComponent implements OnInit {
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
  ejecutivosForm: FormGroup = new FormGroup({});

  constructor(
    private _formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router,
    private sesion: ValidaSesionService, public dialog: MatDialog,
    private modelService: ModelService, private ejecutivosService: EjecutivosService,
    private snackBarService: SnackbarService, public dialogService: DialogService
  ) { 
    super();
    this.ejecutivosForm = this._formBuilder.group(new EjecutivosModel());
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
      this.setValidaciones(this.ejecutivosForm);
    }
  }

  getInfoForm(){
    const tmp = this.modelService.getData();
    if (tmp != null){
      this.temporalSubscription = this.ejecutivosService.get(tmp).subscribe((res: any) => {
        if (res != undefined){
          let model = new EjecutivosModel(res);
          if (this.gestion == 1){
            model.cveejecutivo = null;
            model.estatusejecutivo = 0;
          }
          this.ejecutivosForm = this._formBuilder.group(model);
          if (this.isChecker == false && this.gestion != 4){
            this.setValidaciones(this.ejecutivosForm);
          }
        }
        Loading.hidden();
      }, (error: any) => {
        Loading.hidden();
      });
      this.Subscriptions.push(this.temporalSubscription);
    } else {
      Loading.hidden();
      this.router.navigate(['tharrendadora/ejecutivos']);
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
      form.controls.cveejecutivo.setValidators([Validators.required]);
    }  
   form.controls.nominaejecutivo.setValidators([Validators.required, Validators.maxLength(9)]);       
    form.controls.nombreejecutivo.setValidators([Validators.required, Validators.maxLength(55)]);
    form.controls.correoejecutivo.setValidators([Validators.email, Validators.required, Validators.maxLength(55)]);     
    form.controls.telefonoejecutivo.setValidators([Validators.maxLength(15)]);      
  }
  
  guardar() {
    this.ejecutivosForm.updateValueAndValidity();
    if (this.ejecutivosForm.valid) {
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
            this.router.navigate(['tharrendadora/ejecutivos']);
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
      this.ejecutivosForm.markAllAsTouched();
      this.ejecutivosForm.updateValueAndValidity();
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
    const formValue = this.ejecutivosForm.value;
    
    switch (this.gestion) {
      case 1://alta
      this.postData = formValue;
      this.postData["estatusejecutivo"] = 1;      
      this.resourceToUse = this.ejecutivosService.save(this.postData);
        break;
      case 2: //editar
      this.postData = formValue;
      this.postData["estatusejecutivo"] = 1;
      this.resourceToUse = this.ejecutivosService.update(this.postData);
        break;
      case 4: //borrar
        //data.push({ cvemoneda: formValue.cvemoneda });
        this.postData = formValue;       
        this.postData["estatusejecutivo"] = 4; //BAJA LOGICA
        this.resourceToUse = this.ejecutivosService.delete(this.postData);
        break;
      default:
        this.router.navigate(['tharrendadora/ejecutivos']);
        break;
    }   
  } 


}
