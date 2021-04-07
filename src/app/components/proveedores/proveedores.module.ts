import { ProveedoresComponent } from './proveedores.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material-module';
import { ControlesModule } from 'src/app/controles/controles.module';
import { AltaProveedoresComponent } from './alta-proveedores/alta-proveedores.component';
import { ProveedoresRoutingModule } from './proveedores-routing.module';

@NgModule({  
  declarations: [ProveedoresComponent, AltaProveedoresComponent],
  imports: [
    CommonModule,
    SharedModule,
    ControlesModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ProveedoresRoutingModule,
    MatFormFieldModule
  ],  
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ProveedoresModule { }
