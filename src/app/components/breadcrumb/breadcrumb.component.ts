import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  @Input() opcion: string = '';
  @Input() subOpcion: string = '';
  @Input() link: string = '';
  constructor() { }

  ngOnInit(): void {
  }

}
