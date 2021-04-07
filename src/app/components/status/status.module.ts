import { AltaStatusComponent } from './alta-status/alta-status.component';
import { StatusComponent } from './status.component';
import { StatusRoutingModule } from './../status/status-routing.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material-module';
import { ControlesModule } from 'src/app/controles/controles.module';

@NgModule({  
  declarations: [StatusComponent, AltaStatusComponent],
  imports: [
    CommonModule,
    SharedModule,
    ControlesModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    StatusRoutingModule,
    MatFormFieldModule
  ],  
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class StatusModule { }
