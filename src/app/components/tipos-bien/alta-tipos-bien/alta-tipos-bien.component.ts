import { ModalSeleccionComponent } from './../../modal/modalSeleccion.component';
import { Caracteristicas } from './../../../modelos/tipos-bien/Caracteristicas';
import { TiposBienModel } from './../../../modelos/tipos-bien/tipos-bien.model';
import { TiposBienService } from './../../../servicios/tipos-bien/tipos-bien.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'src/app/servicios/dialog/dialog.service';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { BaseComponent } from '../../base.component';
import { ValidaSesionService } from '../../login/validaSesion.service';
import { Loading } from '../../modal/loading';
import { ModelService } from '../../services/model.service';
import { Validaciones } from '../../validaciones';
import { from, Subscription } from 'rxjs';
import { ModalComponent } from './../../modal/modal.component';
import { CatalogosService } from 'src/app/servicios/catalogos/catalogos.service';
import { MatTableDataSource } from '@angular/material/table';
import { ModalSeleccion2Component } from './../../modal/modal-seleccion2/modal-seleccion2.component';

@Component({
  selector: 'app-alta-tipos-bien',
  templateUrl: './alta-tipos-bien.component.html',
  styleUrls: ['./alta-tipos-bien.component.css']
})
export class AltaTiposBienComponent extends BaseComponent implements OnInit {
  isChecker;
  gestion = 1;
  opcion = '';
  hideId = true;
  disabled = false;
  required = false;
  gestionMigaja = '';
  MensajeModalAlta = 'Se agregará un nuevo registro';
  mensajeModal = `¿Está seguro de ${this.opcion} este registro?`;
  btnAddText = 'Guardar';
  authorize = false;
  approved: boolean = false;
  searchValue: string = '';
  postData = {
    user: 1,
    role: 'maker',
    data: {},
    approved: false
  };
  resourceToUse;
  ID: number = 0;
  public agrupadorArray = [];
  caracteristicasColumns = [];
  public subscribers: Array<Subscription> = new Array<Subscription>();
  caracteristicas: Array<Caracteristicas> = new Array<Caracteristicas>();
  caracteristicasData: MatTableDataSource<any> = new MatTableDataSource([]);

  agrupadorNombreControl: FormControl = new FormControl();
  tmpSubGpoCaract: Subscription;
  tmpSubDescAgp: Subscription;
  tiposBienForm: FormGroup = new FormGroup({});

  constructor(
    private _formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router,
    private sesion: ValidaSesionService, public dialogService: DialogService,
    private modelService: ModelService, private tiposBienService: TiposBienService,
    private snackBarService: SnackbarService, public dialog: MatDialog, private catalogoService: CatalogosService
  ) {
    super();
    this.tiposBienForm = this._formBuilder.group(new TiposBienModel());
  }

  ngOnInit(): void {
    this.postData.role = this.sesion.getRol();
    this.isChecker = (this.sesion.getRol() == 'checker' ? true : false);
    this.activatedRoute.params.subscribe(par => {
      if (par.gestion != null) {
        this.setParametrosGestion(par.gestion);
      }
    });
    if (this.gestionMigaja != 'Alta') {
      Loading.show();

      this.getInfoForm();
    }
    if (this.isChecker == false) {
      this.required = true;
      this.setValidaciones(this.tiposBienForm);
    }

    this.getCaracteristicasColumns();
  }

  setValidaciones(form: FormGroup) {
    if (this.gestion != 1) {
      form.controls.idtipobien.setValidators([Validators.required]);
    }
    form.controls.tbcvefamilia.setValidators([Validators.required]);
    form.controls.tbcvegenerico.setValidators([Validators.required]);
    form.controls.tbcvedivision.setValidators([Validators.required]);
    form.controls.tbcvegrupo.setValidators([Validators.required]);
    form.controls.tbcvesubgrupo.setValidators([Validators.required]);
    form.controls.tbcveespecifico.setValidators([Validators.required]);
    form.controls.cveagrupador.setValidators([Validators.required]);


    form.controls.tbdescripcion.setValidators([Validators.required, Validators.maxLength(36)]);
    form.controls.tbvidautil.setValidators([Validators.maxLength(5)]);
    form.controls.tbdictaminar.setValidators([Validators.maxLength(3)]);
    form.controls.tbfacdepreciacion.setValidators([Validators.maxLength(11)]); 
    //form.controls.cveagrupador.setValidators([Validators.maxLength(3)]);      
    form.controls.tbcvecurva.setValidators([Validators.maxLength(4)]);
    form.controls.tbtipogar.setValidators([Validators.maxLength(3)]);
  }

  getInfoForm() {
    const tmp = this.modelService.getData();
    if (tmp != null) {
      this.temporalSubscription = this.tiposBienService.get(tmp).subscribe((res: any) => {
        if (res != undefined) {
          let model = new TiposBienModel(res);

          this.caracteristicas = model.cveagrupador;
          this.caracteristicasData = new MatTableDataSource(this.caracteristicas);          
          this.tmpSubGpoCaract = this.catalogoService.getCaracteristicasByAgrupador(model.cveagrupador).subscribe(
            (response: any) => {
              const myArray: any[] = [];
              for (let item of response) {
                myArray.push(item.caracteristica);
              }
              response = myArray;
              this.caracteristicasData = response;
              console.log(this.caracteristicasData);
            });
          this.subscribers.push(this.tmpSubGpoCaract);

          this.tmpSubDescAgp = this.catalogoService.getAgrupadoresById(model.cveagrupador).subscribe(
            (resp: any) => {
              this.agrupadorNombreControl.setValue(resp.descagrupador);
            }
          )
          this.subscribers.push(this.tmpSubDescAgp);

          if (this.gestion == 1) {
            model.idtipobien = null;
            model.tbestatus = 0;
          }
          this.tiposBienForm = this._formBuilder.group(model);
          if (this.isChecker == false && this.gestion != 4) {
            this.setValidaciones(this.tiposBienForm);
          }
        }
        Loading.hidden();
      }, (error: any) => {
        Loading.hidden();
      });
      this.Subscriptions.push(this.temporalSubscription);
    } else {
      Loading.hidden();
      this.router.navigate(['arrendadora/tipos-bien']);
      this.dialogService.open({
        title: 'Error',
        test: 'No ha seleccionado un registro de la tabla',
        btnAcceptText: 'Aceptar',
        btnCancelText: ''
      });
    }
  }

  setParametrosGestion(gestion) {
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

  rechazar() {

  }

  autorizar() {

  }

  guardar() {
    this.tiposBienForm.updateValueAndValidity();
    if (this.tiposBienForm.valid) {
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
            this.router.navigate(['arrendadora/tipos-bien']);
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
      Loading.hidden();
      this.tiposBienForm.markAllAsTouched();
      this.tiposBienForm.updateValueAndValidity();
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

  getCaracteristicasColumns() {
    this.caracteristicasColumns = [
      { campo: 'cvecaracteristica', titulo: 'Clave de Característica', cellTemplate: null },
      { campo: 'desccaracteristica', titulo: 'Descripción de Característica', cellTemplate: null }
    ];
  }

  private GetSaveData() {
    const formValue = this.tiposBienForm.value;

    switch (this.gestion) {
      case 1://alta
        this.postData = formValue;
        this.postData["tbestatus"] = 1;
        //this.resourceToUse = this.tiposBienService.save(this.postData);
        break;
      case 2: //editar
        this.postData = formValue;
        this.postData["tbestatus"] = 1;
        this.resourceToUse = this.tiposBienService.update(this.postData);
        break;
      case 4: //borrar
        //data.push({ cvemoneda: formValue.cvemoneda });
        this.postData = formValue;
        this.postData["tbestatus"] = 4; //BAJA LOGICA
        //this.resourceToUse = this.tiposBienService.delete(this.postData);
        break;
      default:
        this.router.navigate(['arrendadora/tipos-bien']);
        break;
    }
  }

  // INICIA
  openModalAgrupador() {
    this.openModalSeleccion('/agrupadores/consultaGeneral', { input1: 'cveagrupador', input2: 'agrupadorNombreControl' }, 'Grupos Características');
  }

  openModalSeleccion(catalogo, inputId, title) {
    const modalSelection = this.dialog.open(ModalSeleccionComponent, {
      width: '50%',
      data: {
        title: `Catálogo ${title}`,
        text: '',
        btnAcept: true,
        btnCancel: true,
        getCatalogo: catalogo,
        elementId: inputId
      },
    });
    this.temporalSubscription = modalSelection.afterClosed().subscribe(result => {
      if (!result) {
        this.tiposBienForm.controls[inputId.input1].setValue((document.getElementById(inputId.input1) as HTMLInputElement).value);
        this.tmpSubGpoCaract = this.catalogoService.getCaracteristicasByAgrupador(this.tiposBienForm.controls['cveagrupador'].value).subscribe(
          (response: any) => {
            const myArray: any[] = [];
            for (let item of response) {
              myArray.push(item.caracteristica);
            }
            response = myArray;
            this.caracteristicasData = response;
            console.log(this.caracteristicasData);
          });
        this.subscribers.push(this.tmpSubGpoCaract);
        this.tmpSubDescAgp = this.catalogoService.getAgrupadoresById(this.tiposBienForm.controls['cveagrupador'].value).subscribe(
          (resp: any) => {
            this.agrupadorNombreControl.setValue(resp.descagrupador);
          }
        )
        this.subscribers.push(this.tmpSubDescAgp);

      }
    });
    this.Subscriptions.push(this.temporalSubscription);
    console.log(this.tiposBienForm.controls['cveagrupador'].value);


  }

  // -- Search

  setDataSearchAgrupador(trigger) {
    
    this.setDataSearch('Grupo de Características', this.tiposBienForm.controls.cveagrupador, this.agrupadorNombreControl, trigger);
    
  }

  setDataSearch(type: string, infoControl: AbstractControl, displayNameControl: AbstractControl, triggered: boolean) {
    Loading.show();
    let text = infoControl.value;
    displayNameControl.setValue('');
    if (String(text).trim().length > 0) {
     
      this.tmpSubGpoCaract = this.catalogoService.getCaracteristicasByAgrupador(String(text).trim()).subscribe(
        (response: any) => {
          const myArray: any[] = [];
          for (let item of response) {
            myArray.push(item.caracteristica);
          }
          response = myArray;
          this.caracteristicasData = response;
          console.log(this.caracteristicasData);
        });
      this.subscribers.push(this.tmpSubGpoCaract);
      this.tmpSubDescAgp = this.catalogoService.getAgrupadoresById(String(text).trim()).subscribe(
        (resp: any) => {
          this.agrupadorNombreControl.setValue(resp.descagrupador);
        }
      )
      this.subscribers.push(this.tmpSubDescAgp);
    }
    Loading.hidden();
  }
  // TERMINA
}
