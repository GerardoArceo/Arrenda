import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { AgrupadoresService } from './../../servicios/agrupadores/agrupadores.service';
import { AgrupadoresModel } from './../../modelos/agrupadores/agrupadores.model';
import { Agrupador } from './Agrupador';
import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Validaciones } from '../validaciones';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalSeleccionComponent } from '../modal/modalSeleccion.component';
import { ServiceService } from '../services/service.service';
import { ModelService } from '../services/model.service';
import { ValidaSesionService } from '../login/validaSesion.service';
import { Loading } from '../modal/loading';
import { SummaryResolver } from '@angular/compiler';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-alta-agrupadores',
  templateUrl: './alta-agrupadores.component.html',
  styleUrls: ['./alta-agrupadores.component.css']
})
export class AltaAgrupadoresComponent extends BaseComponent implements OnInit {
  Form: FormGroup;
  gestion = 1;
  btnAddText = "Guardar";
  private validacionForms = false; 
  isAdd;
  required = false;
  opcion = '';
  hideId = true;
  disabled = false;
  isChecker;
  public gestionMigaja = "";  
  resourceToUse;
  estatusAux = 0;
  approved: boolean;  
  MensajeModalAlta = 'Se agregará un nuevo registro';
  mensajeModal = `¿Está seguro de ${this.opcion} este registro?`;
  postData = {
    user: 1,
    role: "maker",
    data: {}
  };
agrupador = {
  cveagrupador: 0,
  descagrupador: ''
};

agrupadoresForm: FormGroup = new FormGroup({});

  constructor(
    private _formBuilder: FormBuilder, private snackBarService: SnackbarService,
    private rutaActiva: ActivatedRoute,    private router: Router,
    public dialog: MatDialog,     private service: ServiceService,
    private modelService: ModelService,    private sesion: ValidaSesionService,
    private activatedRoute: ActivatedRoute,     private agrupadoresService: AgrupadoresService
  ) { 

    super();
    this.agrupadoresForm = this._formBuilder.group(new AgrupadoresModel);
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
        case 'autorizar':
          this.isAdd = true;
          this.gestion = 3;
          this.gestionMigaja = "Autorizar";  
          this.opcion = 'autorizar';        
          break;       
      case 'borrar':
        this.hideId = false;
        this.btnAddText = 'Eliminar';
        this.gestion = 4;
        this.gestionMigaja = 'Borrar';
        this.disabled = true;
        this.opcion = 'eliminar';
        break;
      default:
        this.router.navigate(['arrendadora/agrupadores']);
        break;
    }
    this.mensajeModal = `¿Está seguro de ${this.opcion} este registro?`;
  }

  setDataTable() {   
    Loading.show();
      var temp = this.modelService.getData();
      if (temp) {       
        this.temporalSubscription = this.agrupadoresService.getAgrupador(temp).subscribe((res: any) => {
          if (res != undefined){
            let model = new AgrupadoresModel(res);    
            if (this.gestion == 1){
              model.cveagrupador = null;
              model.estatusagrupador = 0;
            }
            this.agrupadoresForm = this._formBuilder.group(model);
            if (this.isChecker == false && this.gestion != 4){
              this.setValidaciones(this.agrupadoresForm);
            }                    
          }
          Loading.hidden();
        }, (error: any) => {
          Loading.hidden();
        });
        this.Subscriptions.push(this.temporalSubscription);          
      } else {
        this.router.navigate(['arrendadora/agrupadores']);
        this.dialog.open(ModalComponent, {
          width: '400px',
          data: {
            title: "Error",
            text: "No ha seleccionado un registro de la tabla",
            btnAcept: true,
            btnCancel: false
          },
        });
      }
    
  }  

  ngOnInit(): void {
    this.postData.role = this.sesion.getRol();
    this.isChecker = this.sesion.getRol() == 'checker' ? true : false;     
    this.activatedRoute.params.subscribe(par => {
      if (par.gestion != null) {
        this.setParametrosGestion(par.gestion);
      }
    });   
    if (this.gestionMigaja != 'Alta') {
      Loading.show();

      this.setDataTable();//this.getInfoForm();
    }

    if (this.isChecker == false) {
      this.required = true;
      this.setValidaciones(this.agrupadoresForm);
    }      
    
  }

  setValidaciones(form: FormGroup){
    if (this.gestion != 1){
      form.controls.cveagrupador.setValidators([Validators.required]);
    }             
    form.controls.descagrupador.setValidators([Validators.required, Validators.maxLength(36)]);
    
  }

  guardar() {
    this.agrupadoresForm.updateValueAndValidity();
    if (this.agrupadoresForm.valid) {
      const modal = this.dialog.open(ModalComponent, {
        width: '400px',
        data: {
          title: this.mensajeModal,
          text: "Al aceptar no se podrá deshacer la acción",
          btnAcept: true,
          btnCancel: true
        },
      });
      modal.afterClosed().subscribe(result => {
        if (result) {
          Loading.show();      
          this.GetSaveData();
          this.temporalSubscription = this.resourceToUse.subscribe(arg => {
            this.router.navigate(['arrendadora/agrupadores']);
            this.snackBarService.alertaSuccess('Operación realizada con éxito');
            Loading.hidden();
          }, (error) => {
            Loading.hidden();
            this.snackBarService.alertaError('Ocurrió un error al obtener la informcaión');
          });
          this.Subscriptions.push(this.temporalSubscription);         
        }
      });
    } else {
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
    const formValue = this.agrupadoresForm.value;
    
    switch (this.gestion) {
      case 1://alta
      this.postData = formValue;
      this.postData["estatusagrupador"] = 1;      
      this.resourceToUse = this.agrupadoresService.saveAgrupador(this.postData);
        break;
      case 2: //editar
      this.postData = formValue;
      this.postData["estatusagrupador"] = 1;
      this.resourceToUse = this.agrupadoresService.updateAgrupador(this.postData);
        break;
      case 4: //borrar
        //data.push({ cvemoneda: formValue.cvemoneda });
        this.postData = formValue;       
        this.postData["estatusagrupador"] = 4; //BAJA LOGICA
        this.resourceToUse = this.agrupadoresService.deleteAgrupador(this.postData);
        break;
      default:
        this.router.navigate(['arrendadora/monedas']);
        break;
    }
  }

  rechazar(){

  }

  autorizar(){

  }

} 