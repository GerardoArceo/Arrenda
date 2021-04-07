import { format } from 'path';
import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from '../services/service.service';
import { ModelService } from '../services/model.service';
import { ValidaSesionService } from '../login/validaSesion.service';
import { MatSort } from '@angular/material/sort';
import { Loading } from '../modal/loading';
import { ModalComponent } from '../modal/modal.component';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface tableData {
  iddiainhabil: string;
  fechadiainhabil: Date;  
  descdiainhabil: string;
  obsdiainhabil: string;
  estatusdiainhabil: string;
  Acciones: string;
}

@Component({
  selector: 'app-dias-inhabiles',
  templateUrl: './dias-inhabiles.component.html',
  styleUrls: ['./dias-inhabiles.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class diasinhabilesComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'iddiainhabil',
    'fechadiainhabil',
    'descdiainhabil',
    'obsdiainhabil',
    'Acciones'];

  dataSource:  MatTableDataSource<tableData>;
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
  
      this.service.getAll("/diainhabil/consultaGeneral").subscribe(
        (response: any) => {
          this.estadoResponse = response[""];//response["data"]
          console.log(this.estadoResponse);
        if (response.length > 0) {
          console.log(response);
          this.dataSource = new MatTableDataSource(response);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
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
    let diasinhabiles = this.dataSource.data;
    let diainhabil = diasinhabiles.find(x=>x.iddiainhabil === element.iddiainhabil);
    
    this.modelService.setData(diainhabil);
    this.gestionBloqueado(element, "editar");
  }

  gestionBloqueadoBorrar(element) {
      this.gestionBloqueado(element, "borrar");
  }

  ngOnDestroy(){
    if (this.peticion1 != null){
      this.peticion1.unsubscribe();
    }    
  }

  gestionImprimePDF(element){
    let urlDiaInh = `${environment.urlApi}/diainhabil/reporte/${element.iddiainhabil}`;
    window.open(urlDiaInh, '_blank');
  }

}

