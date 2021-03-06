import { error, element } from 'protractor';
import { Loading } from './../modal/loading';
import { environment } from 'src/environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { SnackbarService } from './../../servicios/snackbar/snackbar.service';
import { TiposBienService } from './../../servicios/tipos-bien/tipos-bien.service';
import { ModelService } from './../services/model.service';
import { ServiceService } from './../services/service.service';
import { DialogService } from './../../servicios/dialog/dialog.service';
import { ValidaSesionService } from './../login/validaSesion.service';
import { BaseComponent } from './../base.component';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-tipos-bien',
  templateUrl: './tipos-bien.component.html',
  styleUrls: ['./tipos-bien.component.css']
})
export class TiposBienComponent extends BaseComponent implements OnInit {

  dataSource: MatTableDataSource<any> = new MatTableDataSource([]);
  data=[];
  isChecker;
  searchValue: string = '';
  columns: Array<any>;
  postData = {
    user: 1,
    role: 'maker',
    data: {},
    approved:false
  }
  errors = [];
  idsToVerify = [];
  dataToVeriFy = [];

  @ViewChild('accionTemplate', { static: true }) accionTemplate: TemplateRef<any>;
  @ViewChild('checkTemplate', { static: true}) checkTemplate: TemplateRef<any>;
  
  constructor(
    private sesion: ValidaSesionService, public dialogService: DialogService,
    private alertService: ServiceService, private modelService: ModelService,
    private tiposBienService: TiposBienService, snackBarService: SnackbarService 
  ) { 
    super();
  }

  ngOnInit(): void {
    this.isChecker = this.sesion.getRol() == 'checker' ? true : false;
    this.getTableColumns();

    this.loadTable();
  }

  getTableColumns(){
    this.columns = [
      { campo: 'idtipobien', titulo: 'ID', cellTemplate: null },
      { campo: 'tbcvefamilia', titulo: 'Familia', cellTemplate: null },
      { campo: 'tbcvegenerico', titulo: 'G??nero', cellTemplate: null },
      { campo: 'tbcvedivision', titulo: 'Divisi??n', cellTemplate: null },
      { campo: 'tbcvegrupo', titulo: 'Grupo', cellTemplate: null },
      { campo: 'tbcvesubgrupo', titulo: 'Subgrupo', cellTemplate: null },
      { campo: 'tbcveespecifico', titulo: 'Espec??fico', cellTemplate: null },
      { campo: 'cveagrupador', titulo: 'Grupo de Caracter??sticas', cellTemplate: null },
      { campo: 'tbdescripcion', titulo: 'Descripci??n', cellTemplate: null },
      { campo: 'tbvidautil', titulo: 'Vida ??til', cellTemplate: null },
      { campo: 'tbdictaminar', titulo: 'Tipo de Auditor??a', cellTemplate: null },
      { campo: 'tbfacdepreciacion', titulo: 'Depreciaci??n', cellTemplate: null },
      { campo: 'tbcvecurva', titulo: 'Curva Dem??rito', cellTemplate: null },
      { campo: 'tbtipogar', titulo: 'Tipo Garant??a', cellTemplate: null },     
      { campo: null, titulo: 'Acciones', cellTemplate: this.accionTemplate}
    ];    
  }

  loadTable(){
    Loading.show();
    this.temporalSubscription = this.tiposBienService.getAll().subscribe(
      (res: any) => {
        if (res != undefined){
          if (res.length > 0){            
            this.data = this.getStatus(res);
            this.dataSource = new MatTableDataSource(this.data);           
            Loading.hidden();
          }else{
            this.alertService.alertaError('No hay datos disponibles');
            Loading.hidden();
          }
        }
      }, (error) => {
        this.alertService.alertaError('Ocurri?? un problema al realizar la petici??n');
        Loading.hidden();
      });
      this.Subscriptions.push(this.temporalSubscription);
  }

  getStatus(data){
    return data;
  }

  gestionBtn(element){
    this.modelService.setData(element.idtipobien);
  }

  gestionBloqueadoEditar(element){
    this.gestionBloqueado(element, 'editar');
  }



  gestionBloqueado(element, gestion){
    this.gestionBtn(element);
  }

  gestionImprimePDF(element){
    let url = `${environment.urlApi}/tipobien/reporte/${element.idtipobien}`;
    window.open(url, '_blank');
  }

  verModal(element){
    console.log(element);
    this.dialogService.verDatos({
      title: 'Descripci??n Tipos de Bien',
      type: 'tipos-bien',
      body: element
    });
  }


}
