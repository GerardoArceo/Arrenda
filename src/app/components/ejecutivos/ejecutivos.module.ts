import { AltaEjecutivosComponent } from './alta-ejecutivos/alta-ejecutivos.component';
import { EjecutivosComponent } from './ejecutivos.component';
import { EjecutivosRoutingModule } from './../ejecutivos/ejecutivos-routing.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material-module';
import { ControlesModule } from 'src/app/controles/controles.module';

@NgModule({  
  declarations: [EjecutivosComponent, AltaEjecutivosComponent],
  imports: [
    CommonModule,
    SharedModule,
    ControlesModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    EjecutivosRoutingModule,
    MatFormFieldModule
  ],  
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class EjecutivosModule { }
