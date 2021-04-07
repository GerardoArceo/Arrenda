import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-modalSeleccion2',
  templateUrl: './modal-seleccion2.component.html',
  styleUrls: ['./modal-seleccion2.component.css']
})
export class ModalSeleccion2Component implements OnInit {

  displayedColumns: Array<any>;
  dataSource: MatTableDataSource<any> = new MatTableDataSource([]);
  public showLoading = true;
  searchValue: string = '';

  constructor(
    public dialogRef: MatDialogRef<ModalSeleccion2Component>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) { }

  ngOnInit(): void {
    this.showLoading = false;
    this.dataSource = new MatTableDataSource(this.data.dataSource);
    this.displayedColumns = [
      { campo: this.data.firstField, titulo: 'ID', cellTemplate: null },
      { campo: this.data.secondField, titulo: 'Nombre', cellTemplate: null }//,
      // { campo: null, titulo: 'Acciones', cellTemplate: null }
    ];
  }

  tableSelection(element) {
    // this.data.selection = element;
    this.dialogRef.close(element);
  }
}
