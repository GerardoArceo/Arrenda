import { AltaGrupoConceptoComponent } from './alta-grupo-concepto/alta-grupo-concepto.component';
import { GrupoConceptoComponent } from './grupo-concepto.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const ROUTES: Routes = [
  { path: '', component: GrupoConceptoComponent},
  { path: ':gestion', component: AltaGrupoConceptoComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)  ],
    exports: [RouterModule]
  
})
export class GrupoConceptoRoutingModule { }
