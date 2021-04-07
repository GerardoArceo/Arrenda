import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AltaAseguradorasComponent } from './components/aseguradoras/alta-aseguradoras.component';
import { AseguradorasComponent } from './components/aseguradoras/aseguradoras.component';
import { CaracteristicasComponent } from './components/caracteristicas/caracteristicas.component';
import { AltaCaracteristicasComponent } from './components/caracteristicas/alta-caracteristicas.component';
import { diasinhabilesComponent } from './components/dias-inhabiles/dias-inhabiles.component';
import { AltaDiasInhabilesComponent } from './components/dias-inhabiles/alta-dias-inhabiles.component';

const routes: Routes = [
  { path: '', redirectTo: 'arrendadora', pathMatch: 'full' },
  { path: 'arrendadora/login', component: LoginComponent},
  { path: 'arrendadora', component: HomeComponent },
  
  //Catalogos
  { path: 'arrendadora/agrupadores', 
    loadChildren: () => import ('./components/agrupadores/agrupadores.module').then(m=> m.AgrupadoresModule) 
  },  
  {
    path: 'arrenda/facturaProveedor',
    loadChildren: () => import('./components/factura/factura.module').then(m => m.FacturaModule)
  },
  { path: 'arrendadora/aseguradoras', component: AseguradorasComponent},
  { path: 'arrendadora/aseguradoras/:gestion', component: AltaAseguradorasComponent},
  { path: 'arrendadora/caracteristicas/:gestion', component: AltaCaracteristicasComponent},
  { path: 'arrendadora/caracteristicas', component: CaracteristicasComponent},
  { path: 'arrendadora/dias-inhabiles/:gestion', component: AltaDiasInhabilesComponent},
  { path: 'arrendadora/dias-inhabiles', component: diasinhabilesComponent},
  { 
    path: 'arrendadora/monedas',
    loadChildren: () => import('./components/monedas/monedas.module').then(m=> m.MonedasModule)
  },
  {
    path: 'arrendadora/tipos-bien',
    loadChildren: () => import('./components/tipos-bien/tipos-bien.module').then(m=> m.TiposBienModule)
  },
  {
    path: 'arrendadora/grupo-concepto',
    loadChildren: () => import('./components/grupo-concepto/grupo-concepto.module').then(m=> m.GrupoConceptoModule)
  },
  {
    path: 'arrendadora/endoso',
    loadChildren: () => import('./components/endoso/endoso.module').then(m=> m.EndosoModule)
  },
  {
    path: 'arrendadora/leyendas',
    loadChildren: () => import('./components/leyendas/leyendas.module').then(m=> m.LeyendasModule)
  },
  {
    path: 'arrendadora/status',
    loadChildren: () => import('./components/status/status.module').then(m=> m.StatusModule)
  },
  {
    path: 'arrendadora/proveedores',
    loadChildren: () => import('./components/proveedores/proveedores.module').then(m=> m.ProveedoresModule)
  },
  {
    path: 'arrendadora/ejecutivos',
    loadChildren: () => import('./components/ejecutivos/ejecutivos.module').then(m=> m.EjecutivosModule)
  },
  {
    path: 'arrendadora/vendor-program',
    loadChildren: () => import('./components/vendor-program/vendor-program.module').then(m=> m.VendorProgramModule)
  },
  //
  { path: '**', pathMatch: 'full', redirectTo: 'arrendadora' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }