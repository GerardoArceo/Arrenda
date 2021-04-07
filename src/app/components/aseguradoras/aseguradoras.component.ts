
import { Aseguradora } from './Aseguradora';
import { Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from '../services/service.service';
import { Subscription } from 'rxjs';
import { ModelService } from '../services/model.service';
import { ModalComponent } from './../modal/modal.component';
import { ValidaSesionService } from '../login/validaSesion.service';
import { Loading } from '../modal/loading';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

export interface tableData {
  cveaseguradora: string;
  nomaseguradora: string;
  diasaseguradora: string;
  obsaseguradora:string;
  estatusaseguradora: string;
  Acciones: string;
}

@Component({
  selector: 'app-aseguradoras',
  templateUrl: './aseguradoras.component.html',
  styleUrls: ['./aseguradoras.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AseguradorasComponent implements OnInit, OnDestroy {
  displayedColumns: string[]= [
    'cveaseguradora',
    'nomaseguradora',
    'diasaseguradora',
    'obsaseguradora',    
    'Acciones'
  ];

  dataSource: MatTableDataSource<tableData>;
  public isChecker: boolean;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  public estadoResponse = [];
  private peticion1: Subscription;
  
  constructor(
    private service: ServiceService,
    private modelService: ModelService,
    private sesion: ValidaSesionService,
    public dialog: MatDialog,
    private paginatorDesc: MatPaginatorIntl
  ) {       
  }
  
  ngOnInit(): void {
      this.isChecker = this.sesion.getRol() == 'checker' ? true : false;
      this.loadData();
  }

  loadData(){
    let rol = this.sesion.getRol();      
      if (rol) {      
        Loading.show(); 
        this.paginatorDesc.itemsPerPageLabel = "Registros por página";
        this.isChecker = (rol == "checker" ? true : false);
        this.service.getAll("/aseguradoras/consultaGeneral").subscribe(
          (response: any) => {
            console.log(JSON.stringify(response));
            this.estadoResponse = response[""];
            console.log(this.estadoResponse);
          if (response.length > 0) {
            console.log(response);
            this.dataSource = new MatTableDataSource(response);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;//ordena aseguradoras
            Loading.hidden();
          } else {
            this.service.alertaError("no hay datos disponibles");
            this.dataSource = new MatTableDataSource([]);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            Loading.hidden();
          }
        },
        (error) => {
          console.log("error");
          console.log(error);
          Loading.hidden();
          this.service.alertaError("Ocurrió un problema al realizar la petición");
        });
    }
  }

  ngOnDestroy(){
    if (this.peticion1 != null){
      this.peticion1.unsubscribe();
    }   
  }

  ngAfterViewInit() {
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  gestionBtn(element) {
    this.modelService.setData(element);
  }

  gestionBloqueado(element, gestion) {
    if (element.CLASESTATUS == 1) {
      this.dialog.open(ModalComponent, {
        width: '400px',
        data: {
          title: "Arrendadora",
          text: "No se puede " + gestion + " este registro hasta que el usuario con rol Checker lo autorice o rechace",
          btnAcept: true,
          btnCancel: false
        },
      });
    } else { 
      
      this.gestionBtn(element);
    }
  }

  gestionBloqueadoEditar(element) {
    let aseguradoras = this.dataSource.data;
    let aseguradora = aseguradoras.find(x=>x.cveaseguradora === element.cveaseguradora);
    
    this.modelService.setData(aseguradora);
    this.gestionBloqueado(element, "editar");
  }

  gestionBloqueadoBorrar(element) {
      this.gestionBloqueado(element, "borrar");
  }

  gestionImprimePDF(element){
    let urlAsegPDF = `${environment.urlApi}/aseguradoras/reporte/${element.cveaseguradora}`;
    window.open(urlAsegPDF,'_blank');
  }

}




