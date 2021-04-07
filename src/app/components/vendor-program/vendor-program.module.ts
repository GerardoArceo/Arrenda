import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { VendorProgramComponent } from './vendor-program.component';
import { AltaVendorProgramComponent } from './alta-vendor-program/alta-vendor-program.component';
import { ControlesModule } from './../../controles/controles.module';
import { SharedModule } from '../shared/shared.module';
import { VendorProgramRoutingModule } from './vendor-program-routing.module';
import { MaterialModule} from 'src/app/material-module';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [VendorProgramComponent, AltaVendorProgramComponent],
  imports: [
    CommonModule,
    SharedModule,
    ControlesModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    VendorProgramRoutingModule,
    MatFormFieldModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA]  
})
export class VendorProgramModule { }
