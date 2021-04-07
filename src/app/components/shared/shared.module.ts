import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { RouterModule } from '@angular/router';

const COMPONENTS = [BreadcrumbComponent];

@NgModule({
  declarations: [COMPONENTS],
  imports: [
    RouterModule,
    CommonModule
  ],
  exports: COMPONENTS
})
export class SharedModule { }
