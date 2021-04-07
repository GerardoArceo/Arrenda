import { NgModule } from '@angular/core';
import { AltaTiposBienComponent } from './alta-tipos-bien/alta-tipos-bien.component';
import { TiposBienComponent } from './tipos-bien.component';
import { Routes, RouterModule } from '@angular/router';


const ROUTES: Routes = [
    { path: '', component: TiposBienComponent},
    { path: ':gestion', component: AltaTiposBienComponent}
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class TiposBienRoutingModule{};
