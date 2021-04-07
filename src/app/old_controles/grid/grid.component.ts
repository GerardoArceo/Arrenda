import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'control-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit, OnDestroy {

  _search: string = '';
  _searchDate: Date;
  _dataSource;
  headerColumns = [];
  orderBy: string = '';
  @Input() public tableColumns;
  @Input() public selectable: boolean = false;
  @Input() public pageSize: number = 25;
  @Output() public selected: EventEmitter<any> = new EventEmitter();
  // protected data: MatTableDataSource<any>= new MatTableDataSource([]);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @Input()
  set search(val) {
    this._search = val;
    if (val.length > 0) {
      this.applyFilter();
    } else {
      this.eraseFilter();
    }
  }
  get search() {
    return this._search;
  }

  @Input()
  set searchDate(val) {
    this._searchDate = val;
    if (val != null) {
      this.applyDateFilter();
    } else {
      this.eraseFilter();
    }
  }
  get searchDate() {
    return this._searchDate;
  }

  @Input()
  set dataSource(val) {
    this._dataSource = val;
    this._dataSource.paginator = this.paginator;
    this._dataSource.sort = this.sort;
  }
  get dataSource() {
    return this._dataSource;
  }

  constructor() { }

  ngOnInit(): void {
    if (this.tableColumns != null) {
      this.headerColumns = this.tableColumns.filter(f => f.campo != null).map(m => m.campo);
      if (this.tableColumns.some((e: any) => e.campo == null)) {
        this.headerColumns.push('Acciones');
      }
    }
    this.orderBy = this.headerColumns[0];
    // this.dataSource = new MatTableDataSource(this.dataSource);
    // this.headerColumns.push(null);
  }

  ngOnDestroy() {
    this.selected.unsubscribe();
  }

  applyFilter() {
    this._dataSource.filter = this._search.trim().toLowerCase();
    if (this._dataSource.paginator) {
      this._dataSource.paginator.firstPage();
    }
  }

  applyDateFilter() {
    if (this._dataSource != undefined) {
      this._dataSource.filterPredicate = (data: any, filter: string) => {
        return data.DFECHA_OPERA == filter;
      };
      this._dataSource.filter = this._searchDate;
      if (this._dataSource.paginator) {
        this._dataSource.paginator.firstPage();
      }
    }
  }

  eraseFilter() {
    if (this._dataSource != undefined) {
      this._dataSource.filter = null;
    }
  }

  OnSelection(element: any) {
    this.selected.emit(element);
  }

}
