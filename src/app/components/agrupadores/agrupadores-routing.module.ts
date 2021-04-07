
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgrupadoresComponent } from './agrupadores.component';
import { AltaAgrupadoresComponent } from './alta-agrupadores.component';
import { MatFormFieldModule} from '@angular/material/form-field';

const ROUTES: Routes = [
    { path: '', component: AgrupadoresComponent},
    { path: ':gestion', component: AltaAgrupadoresComponent}
  ];

  @NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
  })

export class AgrupadoresRoutingModule {
}
