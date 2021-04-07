
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AltaLeyendasComponent } from './alta-leyendas/alta-leyendas.component';
import { LeyendasComponent } from './leyendas.component';
import { MatFormFieldModule} from '@angular/material/form-field';

const ROUTES: Routes =[
  { path: '', component: LeyendasComponent},
  { path: ':gestion', component: AltaLeyendasComponent}
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class LeyendasRoutingModule { }
