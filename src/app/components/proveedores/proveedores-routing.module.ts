import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AltaProveedoresComponent } from './alta-proveedores/alta-proveedores.component';
import { ProveedoresComponent } from './proveedores.component';

const ROUTES: Routes = [
  { path: '', component: ProveedoresComponent},
  { path: ':gestion', component: AltaProveedoresComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)  ],
    exports: [RouterModule]
  
})
export class ProveedoresRoutingModule { }
