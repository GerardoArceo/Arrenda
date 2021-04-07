import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MonedasComponent } from './monedas.component';
import { AltaMonedasComponent } from './alta-monedas/alta-monedas.component';
import { ControlesModule } from './../../controles/controles.module';
import { SharedModule } from '../shared/shared.module';
import { MonedasRoutingModule } from './monedas-routing.module';
import { MaterialModule} from 'src/app/material-module';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [MonedasComponent, AltaMonedasComponent],
  imports: [
    CommonModule,
    SharedModule,
    ControlesModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MonedasRoutingModule,
    MatFormFieldModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA]  
})
export class MonedasModule { }
