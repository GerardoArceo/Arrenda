import { ControlesModule } from './../../controles/controles.module';
import { MaterialModule } from 'src/app/material-module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TiposBienRoutingModule } from './tipos-bien-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from './../shared/shared.module';
import { AltaTiposBienComponent } from './alta-tipos-bien/alta-tipos-bien.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiposBienComponent } from './tipos-bien.component';

@NgModule({
  declarations: [TiposBienComponent, AltaTiposBienComponent],
  imports: [
    CommonModule, SharedModule, MatFormFieldModule,
    TiposBienRoutingModule, ReactiveFormsModule,
    FormsModule, MaterialModule, ControlesModule
  ],  
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class TiposBienModule { }
