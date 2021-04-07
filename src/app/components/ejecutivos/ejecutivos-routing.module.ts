import { AltaEjecutivosComponent } from './alta-ejecutivos/alta-ejecutivos.component';
import { EjecutivosComponent } from './../ejecutivos/ejecutivos.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const ROUTES: Routes = [
  { path: '', component: EjecutivosComponent},
  { path: ':gestion', component: AltaEjecutivosComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)  ],
    exports: [RouterModule]
  
})
export class EjecutivosRoutingModule { }
