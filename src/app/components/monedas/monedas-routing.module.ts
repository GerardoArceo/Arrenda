
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AltaMonedasComponent } from './alta-monedas/alta-monedas.component';
import { MonedasComponent } from './monedas.component';
import { MatFormFieldModule} from '@angular/material/form-field';

const ROUTES: Routes =[
  { path: '', component: MonedasComponent},
  { path: ':gestion', component: AltaMonedasComponent}
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class MonedasRoutingModule { }
