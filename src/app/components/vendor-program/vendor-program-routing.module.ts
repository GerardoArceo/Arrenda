
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AltaVendorProgramComponent } from './alta-vendor-program/alta-vendor-program.component';
import { VendorProgramComponent } from './vendor-program.component';
import { MatFormFieldModule} from '@angular/material/form-field';

const ROUTES: Routes =[
  { path: '', component: VendorProgramComponent},
  { path: ':gestion', component: AltaVendorProgramComponent}
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class VendorProgramRoutingModule { }
