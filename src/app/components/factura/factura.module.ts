import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacturaRoutingModule } from './factura-routing.module';
import { FacturaComponent } from './factura.component';
import { AltaComponent } from './alta/alta.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlesModule } from 'src/app/controles/controles.module';
import { MaterialModule } from 'src/app/utilities/material-module';
import { AgregarBienComponent } from './agregar-bien/agregar-bien.component';
import { VerDetalleComponent } from './ver-detalle/ver-detalle.component';


@NgModule({
  declarations: [FacturaComponent, AltaComponent, AgregarBienComponent, VerDetalleComponent],
  imports: [
    CommonModule,
    ControlesModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FacturaRoutingModule
  ]
})
export class FacturaModule { }
