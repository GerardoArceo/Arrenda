import { DialogService } from 'src/app/servicios/dialog/dialog.service';
import { AgrupadoresService } from './../../servicios/agrupadores/agrupadores.service';
import { element } from 'protractor';
import { Component, ElementRef, TemplateRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { ModalComponent } from './../modal/modal.component';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from '../services/service.service';
import { ModelService } from '../services/model.service';
import { ValidaSesionService } from '../login/validaSesion.service';
import { Loading } from '../modal/loading';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-agrupadores',
  templateUrl: './agrupadores.component.html',
  styleUrls: ['./agrupadores.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AgrupadoresComponent  extends BaseComponent implements OnInit {
     dataSource: MatTableDataSource<any> = new MatTableDataSource([]);
    public isChecker: boolean;
  public estadoResponse = [];  
  private peticion1: Subscription;
  columns: Array<any>;
  data=[];
  searchValue: string = '';

  @ViewChild('accionTemplate', { static: true}) accionTemplate: TemplateRef<any>;
  @ViewChild('masiveFile', { static: true}) masiveFile: ElementRef<HTMLElement>;
  @ViewChild('checkTemplate', { static: true}) checkTemplate: TemplateRef<any>;

  constructor(
    private sesion: ValidaSesionService, private agrupadoresService: AgrupadoresService,
    private modelService: ModelService,  public dialog: MatDialog, public dialogService: DialogService,
    private paginatorDesc: MatPaginatorIntl, private alertService: ServiceService
  ) { 
     super(); 
  }  

  ngOnInit(): void {
    this.isChecker = this.sesion.getRol() == 'checker' ? true : false;

    this.getTableColumns();
    this.loadData();
  }

  getTableColumns() {
    this.columns = [
      { campo: 'cveagrupador', titulo: 'ID', cellTemplate: null },
      { campo: 'descagrupador', titulo: 'Agrupador', cellTemplate: null },      
      { campo: null, titulo: 'Acciones', cellTemplate: this.accionTemplate}  
    ];
  }

  loadData(){
    Loading.show();

    this.temporalSubscription = this.agrupadoresService.getAllAgrupadores().subscribe(
      (res: any) => {
        if (res != undefined){
          if (res.length > 0){            
            this.data = this.getStatus(res);
            this.dataSource = new MatTableDataSource(this.data);   
            console.log(this.dataSource);        
            Loading.hidden();
          }else{
            this.alertService.alertaError('No hay datos disponibles');
            Loading.hidden();
          }
        }
      }, (error) => {
        console.log(error);
        this.alertService.alertaError('Ocurrió un problema al realizar la petición');
        Loading.hidden();
      });
      this.Subscriptions.push(this.temporalSubscription);
 
  }

  getStatus(data){
    return data;
  }
 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  gestionBtn(element) {
    this.modelService.setData(element.cveagrupador);
  }

  gestionBloqueado(element, gestion) {
    this.gestionBtn(element);
  }

  gestionBloqueadoEditar(element) {
    this.gestionBloqueado(element, 'editar');
  }

  gestionBloqueadoBorrar(element) {
    this.gestionBloqueado(element, "borrar");
  }

  gestionImprimePDF(element){   
    let url = `${environment.urlApi}/agrupadores/reporte/${element.cveagrupador}`;
    window.open(url, '_blank');     
  }

  btnSeleccionarTodo()
  {

  }

  verModal(element){
    console.log(element);
    this.dialogService.verDatos({
      title: 'Descripción Agrupadores',
      type: 'agrupadores',
      body: element
    });
  }


}
