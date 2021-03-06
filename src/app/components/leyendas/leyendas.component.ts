
import { environment } from './../../../environments/environment';
import { Component, OnInit, ElementRef, TemplateRef, ViewChild, Renderer2, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ServiceService } from './../services/service.service';
import { ModelService } from './../services/model.service';
import { Loading } from './../modal/loading';
import { MatTableDataSource } from "@angular/material/table"
import { error } from "protractor";
import { LeyendasModel } from './../../modelos/leyendas/leyendas.model';
import { DialogService } from './../../servicios/dialog/dialog.service';
import { SnackbarService } from './../../servicios/snackbar/snackbar.service';
import { LeyendasService } from 'src/app/servicios/leyendas/leyendas.service'
import { BaseComponent } from './../base.component';
import { ValidaSesionService } from './../login/validaSesion.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-mleyendas',
  templateUrl: './leyendas.component.html',
  styleUrls: ['./leyendas.component.css']  
})
export class LeyendasComponent extends BaseComponent implements OnInit {

  columns: Array<any>;
  data=[];
  dataSource: MatTableDataSource<any> = new MatTableDataSource([]);
  isChecker;
  searchValue: string = '';
  postData = {
    user: 1,
    role: 'maker',
    data: {},
    approved: false
  }
  errors = [];
  idsToVerify = [];
  dataToVeriFy = [];

  @ViewChild('accionTemplate', { static: true}) accionTemplate: TemplateRef<any>;
  @ViewChild('masiveFile', { static: true}) masiveFile: ElementRef<HTMLElement>;
  @ViewChild('checkTemplate', { static: true}) checkTemplate: TemplateRef<any>;

  constructor(
    private sesion: ValidaSesionService, public dialogService: DialogService,
    private alertService: ServiceService, private modelService: ModelService,
    private leyendasService: LeyendasService, private renderer2: Renderer2,
    private snackbarService: SnackbarService, public dialog: MatDialog
  ) { 
    super();
  }

  ngOnInit(): void {
    this.isChecker = this.sesion.getRol() == 'checker' ? true : false;
    this.getTableColums();

    this.loadTable();
  }

  getTableColums(){
    this.columns = [
      { campo: 'idleyenda', titulo: 'ID', cellTemplate: null},
      { campo: 'descleyenda', titulo: 'Leyenda', cellTemplate: null},
      { campo: 'empresaleyenda', titulo: 'Empresa', cellTemplate: null},
      { campo: 'sirhleyenda', titulo: 'SIRH', cellTemplate: null},  
      { campo: 'regionleyenda', titulo: 'Regi??n', cellTemplate: null},  
      { campo: 'tipdoctoleyenda', titulo: 'Tipo de Documento', cellTemplate: null},  
      { campo: 'tipoleyenda', titulo: 'Tipo de Leyenda', cellTemplate: null},  
      { campo: null, titulo: 'Acciones', cellTemplate: this.accionTemplate}      
    ];
  }

  loadTable() {
    Loading.show();
    this.temporalSubscription = this.leyendasService.getAll().subscribe(
      (res: any) => {
      if(res != undefined)
      {
        if (res.length > 0) {
          this.data = this.getStatus(res); 
          this.dataSource = new MatTableDataSource(this.data);
          Loading.hidden();
        } else {
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

  getStatus(data) {
    
    return data;
  }

  gestionBtn(element){
    this.modelService.setData(element.idleyenda);
  }

  gestionBloqueadoEditar(element){
    this.gestionBloqueado(element, 'editar');
  }

  gestionBloqueadoBorrar(element){
    this.gestionBloqueado(element, 'borrar');
  }

  gestionBloqueado(element, gestion) {
    this.gestionBtn(element);        
    }
   
    gestionImprimePDF(element){
      let url = `${environment.urlApi}/leyenda/reporte/${element.idleyenda}`;
      window.open(url, '_blank');
    }

    verModal(element){
      console.log(element);
      this.dialogService.verDatos({
        title: 'Descripci??n Leyendas',
        type: 'leyendas',
        body: element
      });
    }    
  
}
