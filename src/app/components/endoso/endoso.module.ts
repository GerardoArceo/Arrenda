import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EndosoComponent } from './endoso.component';
import { AltaEndosoComponent } from './alta-endoso/alta-endoso.component';
import { ControlesModule } from './../../controles/controles.module';
import { SharedModule } from '../shared/shared.module';
import { EndosoRoutingModule } from './endoso-routing.module';
import { MaterialModule} from 'src/app/material-module';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [EndosoComponent, AltaEndosoComponent],
  imports: [
    CommonModule,
    SharedModule,
    ControlesModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    EndosoRoutingModule,
    MatFormFieldModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA]  
})
export class EndosoModule { }
