import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AltaComponent } from './alta/alta.component';
import { FacturaComponent } from './factura.component';
import { VerDetalleComponent } from './ver-detalle/ver-detalle.component';
import { AgregarBienComponent } from './agregar-bien/agregar-bien.component';

const ROUTES: Routes = [
  { path: '', component: FacturaComponent },
  { path: 'detalle', component: VerDetalleComponent },
  { path: 'agregarBienes', component: AgregarBienComponent },
  { path: 'editar', component: AgregarBienComponent },
  { path: 'autorizar', component: AgregarBienComponent },
  { path: 'alta', component: AltaComponent },
  { path: 'clonar', component: AltaComponent },
  // { path: ':gestion', component: AltaComponent }
  ];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class FacturaRoutingModule { }
