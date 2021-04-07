
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AltaEndosoComponent } from './alta-endoso/alta-endoso.component';
import { EndosoComponent } from './endoso.component';
import { MatFormFieldModule} from '@angular/material/form-field';

const ROUTES: Routes =[
  { path: '', component: EndosoComponent},
  { path: ':gestion', component: AltaEndosoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class EndosoRoutingModule { }
