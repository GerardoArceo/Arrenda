import { Aseguradora } from './Aseguradora';
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
import { format } from 'path';

@Component({
  selector: 'app-alta-aseguradoras',
  templateUrl: './alta-aseguradoras.component.html',
  styleUrls: ['./alta-aseguradoras.component.css']
})
export class AltaAseguradorasComponent implements OnInit {
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
    role: "maker",
    data: {}
  };

  aseguradora = {
    cveaseguradora: 0,
    nomaseguradora: '',
    diasaseguradora: '',
    obsaseguradora:''
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
            this.mensajeModal = "¿Se agregará un nuevo registro en Aseguradoras?";
            this.gestionMigaja = "Alta";
            this.inputActividad();
            break;
          case 'editar':
            this.gestion = 2;
            this.mensajeModal = "¿Está seguro de actualizar esta Aseguradora?";
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
            this.mensajeModal = "¿Está seguro de eliminar esta Aseguradora?";
            this.gestionMigaja = "Borrar";
            this.borrar();
            break;
          default:
            this.router.navigate(['arrendadora/aseguradoras']);
            break;
        }
      });
   }
  
  ngOnInit(): void {
    this.postData.role = this.sesion.getRol();
    this.isChecker = this.postData.role == 'checker' ? true : false;
    this.setDataTable();
  }
  setDataTable() {
    this.setValues(undefined, undefined);
    if (this.gestionMigaja != "Alta") {
    //Loading.show();    
    var temp = this.modelService.getData();
      if (temp) {
          this.service.getAll("/aseguradoras/consultaId/" + temp["cveaseguradora"]).subscribe(
          (response: any) => {
            console.log(response);            
            this.setValues(response, temp); //response["data"]             
            Loading.hidden();
          });
          //*****//this.postData.data = temp; //console.log(JSON.stringify(this.postData.data));         
          console.log(temp);
      } else {
        this.router.navigate(['arrendadora/aseguradoras']);
        this.dialog.open(ModalComponent, {
          width: '400px',
          data: {
            title: "Error",
            text: "No ha seleccionado un registro de la tabla",
            btnAcept: true,
            btnCancel: false
          }
        });
      }
    }
  }
  
  setValues(getData, aseguradora_id) {
    this.Form = this._formBuilder.group({
        //id: this.gestionMigaja != "Alta" ? getData.cveaseguradora : "",
      id:[getData ? getData.cveaseguradora: "", Validators.compose([
        Validaciones.maxLengthNumber(5)
      ])], 
      Nombre: [getData ? getData.nomaseguradora : "", Validators.compose([
        Validators.required,
        Validaciones.maxLengthNumber(36)
      ])],
      dias: [getData ? getData.diasaseguradora : "", Validators.compose([
        Validators.required,
        Validaciones.maxLengthNumber(2)
      ])],
      observaciones: [getData ? getData.obsaseguradora : "", Validators.compose([
        Validaciones.maxLengthNumber(250)
      ])]      
    });
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
              this.postData["nomaseguradora"] = dataValue['Nombre'];  
              this.postData["diasaseguradora"]  = dataValue['dias'];           
              this.postData["obsaseguradora"]  = dataValue['observaciones'];
              this.postData["estatusaseguradora"] = 1;
              this.service.save("/aseguradoras/alta", this.postData,"aseguradoras");
              break;
            case 2: //'editar'
              this.postData["cveaseguradora"] = dataValue['id'];
              this.postData["nomaseguradora"] = dataValue['Nombre'];
              this.postData["diasaseguradora"]  = dataValue['dias'];           
              this.postData["obsaseguradora"]  = dataValue['observaciones'];
              this.postData["estatusaseguradora"] = 1;
              this.postData.data = dataValue;
              this.service.update("/aseguradoras/update/" + dataValue['id'], this.postData,"aseguradoras");
              break;  
              case 3: //'autorizar'                
                break;       
            case 4: //'borrar'
            this.postData["cveaseguradora"] = dataValue['id'];
            this.postData["nomaseguradora"] = dataValue['Nombre'];
            this.postData["diasaseguradora"]  = dataValue['dias'];           
            this.postData["obsaseguradora"]  = dataValue['observaciones'];
            this.postData["estatusaseguradora"] = 4; //BAJA LÓGICA
              this.postData.data = dataValue;
              this.service.update("/aseguradoras/update/" + dataValue['id'], this.postData,"aseguradoras");
              break;
            default:
              this.router.navigate(['arrendadora/aseguradoras']);
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


