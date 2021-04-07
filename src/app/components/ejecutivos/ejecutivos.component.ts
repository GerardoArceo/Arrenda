import { EjecutivosService } from './../../servicios/ejecutivos/ejecutivos.service';
import { BaseComponent } from './../base.component';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ValidaSesionService } from '../login/validaSesion.service';
import { ServiceService } from '../services/service.service';
import { DialogService } from 'src/app/servicios/dialog/dialog.service';
import { ModelService } from '../services/model.service';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { Loading } from '../modal/loading';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ejecutivos',
  templateUrl: './ejecutivos.component.html',
  styleUrls: ['./ejecutivos.component.css']
})
export class EjecutivosComponent extends BaseComponent implements OnInit {
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
    private ejecutivosService: EjecutivosService, snackBarService: SnackbarService 
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
      { campo: 'cveejecutivo', titulo: 'ID', cellTemplate: null },
      { campo: 'nominaejecutivo', titulo: 'Número de Nómina', cellTemplate: null },   
      { campo: 'nombreejecutivo', titulo: 'Nombre', cellTemplate: null },         
      { campo: 'telefonoejecutivo', titulo: 'Teléfono', cellTemplate: null },   
      { campo: 'correoejecutivo', titulo: 'Email', cellTemplate: null },       
      { campo: null, titulo: 'Acciones', cellTemplate: this.accionTemplate}
    ];    
  }
  
  loadTable(){
    Loading.show();
    this.temporalSubscription = this.ejecutivosService.getAll().subscribe(
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
    this.modelService.setData(element.cveejecutivo);
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
    let url = `${environment.urlApi}/ejecutivos/reporte/${element.cveejecutivo}`;
    window.open(url, '_blank');
  }

  verModal(element){
    console.log(element);
    this.dialogService.verDatos({
      title: 'Descripción Ejecutivo',
      type: 'ejecutivos',
      body: element
    });
  }


}
