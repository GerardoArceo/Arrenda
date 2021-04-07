import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from '../services/service.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { Subscription } from 'rxjs';
// import { AbstractControl } from '@angular/forms';

export interface datos {
  ID: string;
  NAME: string;
}

@Component({
  selector: 'app-modalSeleccion',
  templateUrl: './modalSeleccion.component.html',
  styleUrls: ['./modalSeleccion.component.css']
})
export class ModalSeleccionComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['ID', 'NAME'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dataSource: MatTableDataSource<datos>;
  public showLoading = true;
  private peticion1: Subscription;

  constructor(
    public dialogRef: MatDialogRef<ModalSeleccionComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private service: ServiceService,
    public dialog: MatDialog,
    private paginatorDesc: MatPaginatorIntl
  ) {
    this.peticion1 = this.service.getAll(data.getCatalogo).subscribe(
      (response: any) => {
        this.paginatorDesc.itemsPerPageLabel = "Registros por página";
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.showLoading = false;
        console.log(response);
      },
      (error) => {
        console.log("error");
        console.log(error);
        this.service.alertaError("Ocurrió un error al obtener los datos");
      }
    );
  }

  ngOnInit(): void { }

  ngOnDestroy() {
    if (this.peticion1 != null) {
      this.peticion1.unsubscribe();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  tableSeleccion(element) {
    (document.getElementById(this.data.elementId.input1) as HTMLInputElement).value = element.cveagrupador;    
    if (this.data.elementId.input3 != null && this.data.elementId.input4 != null) {
      (document.getElementById(this.data.elementId.input3) as HTMLInputElement).value = element.FCONTRACT_ID;      
    }
    this.dialogRef.close();
  }

}


