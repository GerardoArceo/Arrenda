import { StatusComponent } from './../status/status.component';
import { AltaStatusComponent } from './../status/alta-status/alta-status.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const ROUTES: Routes = [
  { path: '', component: StatusComponent},
  { path: ':gestion', component: AltaStatusComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)  ],
    exports: [RouterModule]
  
})
export class StatusRoutingModule { }
