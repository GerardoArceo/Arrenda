import { BaseComponent } from './../base.component';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ValidaSesionService } from '../login/validaSesion.service';
import { ServiceService } from '../services/service.service';
import { StatusService } from 'src/app/servicios/status/status.service';
import { DialogService } from 'src/app/servicios/dialog/dialog.service';
import { ModelService } from '../services/model.service';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { Loading } from '../modal/loading';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent extends BaseComponent implements OnInit {
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
    private statusService: StatusService, snackBarService: SnackbarService 
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
      { campo: 'idstatus', titulo: 'ID', cellTemplate: null },
      { campo: 'nomtablastatus', titulo: 'Tabla', cellTemplate: null },   
      { campo: 'clavestatus', titulo: 'Clave', cellTemplate: null },         
      { campo: 'descstatus', titulo: 'Descripción', cellTemplate: null },   
      { campo: 'obsstatus', titulo: 'Observaciones', cellTemplate: null },       
      { campo: null, titulo: 'Acciones', cellTemplate: this.accionTemplate}
    ];    
  }
  
  loadTable(){
    Loading.show();
    this.temporalSubscription = this.statusService.getAll().subscribe(
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
        this.alertService.alertaError('Ocurrió un problema al realizar la petición');
        Loading.hidden();
      });
      this.Subscriptions.push(this.temporalSubscription);
  }

  getStatus(data){
    return data;
  }

  gestionBtn(element){
    this.modelService.setData(element.idstatus);
  }

  gestionBloqueadoEditar(element){
    this.gestionBloqueado(element, 'editar');
  }

  gestionBloqueadoBorrar(element){
    this.gestionBloqueado(element, 'borrar');
  }

  gestionBloqueado(element, gestion){
    this.gestionBtn(element);
  }

  gestionImprimePDF(element){
    let url = `${environment.urlApi}/status/reporte/${element.idstatus}`;
    window.open(url, '_blank');
  }

  verModal(element){
    console.log(element);
    this.dialogService.verDatos({
      title: 'Descripción Estatus',
      type: 'tipos-bien',
      body: element
    });
  }


}
