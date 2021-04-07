import { CommonModule } from '@angular/common';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Validaciones } from '../validaciones';
import { element } from 'protractor';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalSeleccionComponent } from '../modal/modalSeleccion.component';
import { ModelService } from '../services/model.service';
import { ValidaSesionService } from '../login/validaSesion.service';
import { Loading } from '../modal/loading';
import { ServiceService} from '../services/service.service';

@Component({
  selector: 'app-alta-caracteristicas',
  templateUrl: './alta-caracteristicas.component.html',
  styleUrls: ['./alta-caracteristicas.component.css']
})
export class AltaCaracteristicasComponent implements OnInit {
  Form: FormGroup;
  btnAddText = "Guardar";
  private validacionForms = false;
  isChecker: boolean; 
  isIdHidden = true;
  deleteBnd = false;
  isAdd = false;  
  public gestionMigaja = "";  
  mensajeModal = "";  
  approved: boolean;
  gestion = 1;
  postData = {
    user: 1,
    role: "maker",
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
            this.mensajeModal = "¿Se agregará un nueva nueva Característica?";
            this.gestionMigaja = "Alta";
            this.inputActividad();
            break;
          case 'editar':
            this.gestion = 2;            
            this.mensajeModal = "¿Está seguro de actualizar esta Característica?";
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
            this.mensajeModal = "¿Está seguro de eliminar esta Característica?";
            this.gestionMigaja = "Borrar";
            this.borrar();
            break;
          default:
            this.router.navigate(['arrendadora/caracteristicas']);
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
        this.service.getAll("/caracteristicas/consultaId/" + temp["cvecaracteristica"]).subscribe(
          (response: any) => {
            console.log(response);           
            this.setValues(response, temp);//response["data"]
            Loading.hidden();
          });
          console.log(temp);            
      } else {
        this.router.navigate(['arrendadora/caracteristicas']);
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

  setValues(getData, caracteristica_id) {
    this.Form = this._formBuilder.group({
      id:[getData ? getData.cvecaracteristica: ""], 
      descripcionCaracteristica: [getData ? getData.desccaracteristica : "",Validators.compose([
        Validators.required,
        Validaciones.maxLengthNumber(36)
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
              this.postData["cvecaracteristica"] = dataValue['id'];
              this.postData["desccaracteristica"] = dataValue['descripcionCaracteristica'];              
              this.postData["estatuscaracteristica"] = 1;
              this.service.save("/caracteristicas/alta", this.postData,"caracteristicas");
              break;
            case 2: //'editar'
              this.postData["cvecaracteristica"] = dataValue['id'];
              this.postData["desccaracteristica"] = dataValue['descripcionCaracteristica'];
              this.postData["estatuscaracteristica"] = 1;
              this.postData.data = dataValue;
              this.service.update("/caracteristicas/update/" + dataValue['id'], this.postData,"caracteristicas");                         
              break;  
              case 3: //'autorizar'
                
                break;       
            case 4: //'borrar'
              this.postData["cvecaracteristica"] = dataValue['id'];  
              this.postData["desccaracteristica"] = dataValue['descripcionCaracteristica'];
              this.postData["estatuscaracteristica"] = 4; //BAJA LÓGICA
              this.postData.data = dataValue;
              this.service.update("/caracteristicas/update/" + dataValue['id'], this.postData,"caracteristicas");
              break;
            default:
              this.router.navigate(['arrendadora/caracteristicas']);
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