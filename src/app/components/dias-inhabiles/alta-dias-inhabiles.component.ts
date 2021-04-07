import { format } from 'path';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Validaciones } from '../validaciones';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalSeleccionComponent } from '../modal/modalSeleccion.component';
import { element } from 'protractor';
import { ServiceService } from '../services/service.service';
import { ModelService } from '../services/model.service';
import { ValidaSesionService } from '../login/validaSesion.service';
import { Loading } from '../modal/loading';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { from } from 'rxjs';

@Component({
  selector: 'app-alta-dias-inhabiles',
  templateUrl: './alta-dias-inhabiles.component.html',
  styleUrls: ['./alta-dias-inhabiles.component.css']
})
export class AltaDiasInhabilesComponent implements OnInit {
  Form: FormGroup;
  btnAddText = "Guardar";
  private validacionForms = false;
  isAdd = false;
  isIdHidden = true;
  deleteBnd = false;
  isChecker: boolean;
  public gestionMigaja = "";
  mensajeModal = "";
  estatusAux = 0;
  approved: boolean;
  gestion = 1;
  postData = {
    user: 1,
    role: 'maker',
    data: {}
  };

  constructor(
    private _formBuilder: FormBuilder,
    private rutaActiva: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private service: ServiceService,
    private modelService: ModelService,
    private sesion: ValidaSesionService
  ) { 

    this.rutaActiva.params.subscribe(
      (params: Params) => {
        switch (params.gestion) {
          case 'alta':
            this.isIdHidden = false;
            this.gestion = 1;
            this.mensajeModal = "¿Se agregará un nuevo registro?";
            this.gestionMigaja = "Alta";
            this.inputActividad();
            break;
          case 'editar':
            this.gestion = 2;            
            this.mensajeModal = "¿Está seguro de actualizar este registro?";
            this.gestionMigaja = "Editar";
            this.inputActividad();
            break;  
            case 'autorizar':
              this.isAdd = true;
              this.gestion = 3;
              this.gestionMigaja = "Autorizar";
              this.borrar();
              break;       
          case 'borrar':
            this.gestion = 4;
            this.btnAddText = "Eliminar";
            this.mensajeModal = "¿Está seguro de eliminar este registro?";
            this.gestionMigaja = "Borrar";
            this.borrar();
            break;
          default:
            this.router.navigate(['arrendadora/dias-inhabiles']);
            break;
        }
      });

  }

  setDataTable() {
    this.setValues(undefined, undefined);
    if (this.gestionMigaja != "Alta") {
      //Loading.show();
      var temp = this.modelService.getData();
      if (temp) {       
        this.service.getAll("/diainhabil/consultaId/" + temp["iddiainhabil"]).subscribe(
          (response: any) => {
            console.log(response);           
            this.setValues(response, temp);//response["data"]
            Loading.hidden();
          });
          
          console.log(temp);            
      } else {
        this.router.navigate(['arrendadora/dias-inhabiles']);
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
  }

  setValues(getData, diainhabil_id) {

    this.Form = this._formBuilder.group({
      id:[getData ? getData.iddiainhabil: ""], 
      Fecha: [getData ? getData.fechadiainhabil : "",Validators.compose([
        Validators.required        
      ])],
      descripcionDiaInhabil: [getData ? getData.descdiainhabil : "",Validators.compose([
        Validators.required,
        Validaciones.maxLengthNumber(36)
      ])],
      obsDiaInhabil: [getData ? getData.obsdiainhabil : "",Validators.compose([     
        Validaciones.maxLengthNumber(250)
      ])]     
    });
  }
     
  ngOnInit(): void {
    this.postData.role = this.sesion.getRol();
    this.isChecker = this.postData.role == 'checker' ? true : false;
    this.setDataTable();
  }  

  inputActividad() {
    this.deleteBnd = false;
  }

  borrar() {
    this.deleteBnd = true;
  }

  guardar() {
    if (Validaciones.requerido("formValidation") && this.Form.valid) {
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
          let dataValue = this.Form.value;
          
          switch (this.gestion) {
            case 1://'alta'                       
              this.postData.data["fechadiainhabil"] = dataValue['Fecha'];
              this.postData.data["descdiainhabil"] = dataValue['descripcionDiaInhabil'];   
              this.postData.data["obsdiainhabil"] = dataValue['obsDiaInhabil'];     
              this.postData.data["estatusdiainhabil"] = 1; 
              this.service.save("/diainhabil/alta", this.postData.data,"dias-inhabiles");
              break;
            case 2: //'editar'
             this.postData.data["iddiainhabil"] = dataValue['id'];
              this.postData.data["fechadiainhabil"] = dataValue['Fecha'];
              this.postData.data["descdiainhabil"] = dataValue['descripcionDiaInhabil'];
              this.postData.data["obsdiainhabil"] = dataValue['obsDiaInhabil'];
              this.postData.data["estatusdiainhabil"] = 1;   
              console.log(JSON.stringify(this.postData.data));
              this.service.update("/diainhabil/update/" + dataValue['id'], this.postData.data,"dias-inhabiles");                         
              break;  
              case 3: //'autorizar'
                
                break;       
            case 4: //'borrar'
              this.postData["iddiainhabil"] = dataValue['id'];            
              this.postData["fechadiainhabil"] = dataValue['Fecha'];
              this.postData["descdiainhabil"] = dataValue['descripcionDiaInhabil'];
              this.postData["obsdiainhabil"] = dataValue['obsDiaInhabil'];
              this.postData["estatusdiainhabil"] = 4;//estatus 4=Eliminado -> BAJA LÓGICA*/           
              this.postData.data = dataValue;              
              this.service.update("/diainhabil/update/" + dataValue['id'], this.postData,"dias-inhabiles");
              break;
            default:
              this.router.navigate(['arrendadora/dias-inhabiles']);
              break;
          }         
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

} 