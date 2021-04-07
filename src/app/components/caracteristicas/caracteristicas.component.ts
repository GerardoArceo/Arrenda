import { environment } from './../../../environments/environment';
import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from '../services/service.service';
import { Subscription } from 'rxjs';
import { ModelService } from '../services/model.service';
import { ValidaSesionService } from '../login/validaSesion.service';
import { Loading } from '../modal/loading';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

export interface tableData {
  cvecaracteristica: string;
  desccteristica: string;
  estatuscaracteristica: string;
  Acciones: string;
}

@Component({
  selector: 'app-caracteristicas',
  templateUrl: './caracteristicas.component.html',
  styleUrls: ['./caracteristicas.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CaracteristicasComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'cvecaracteristica',
    'desccaracteristica',
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

  loadData()
  {
    let rol = this.sesion.getRol();
      if (rol) {
      Loading.show(); 
      this.paginatorDesc.itemsPerPageLabel = "Registros por página";      
      this.isChecker = (rol == "checker" ? true : false);
      this.service.getAll("/caracteristicas/consultaGeneral").subscribe(
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
    let caracteristicas = this.dataSource.data;
    let caracteristica = caracteristicas.find(x=>x.cvecaracteristica === element.cvecaracteristica);
    
    this.modelService.setData(caracteristica);
    this.gestionBloqueado(element, "editar");
  }

  gestionBloqueadoBorrar(element) {  
      this.gestionBloqueado(element, "borrar");   
  }

  gestionImprimePDF(element){
    let urlCaractPDF = `${environment.urlApi}/caracteristicas/reporte/${element.cvecaracteristica}`;
    window.open(urlCaractPDF,'_blank');
  }

  ngOnDestroy(){
    if (this.peticion1 != null){
      this.peticion1.unsubscribe();
    }   
  }

}

