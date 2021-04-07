import { AltaGrupoConceptoComponent } from './alta-grupo-concepto/alta-grupo-concepto.component';
import { GrupoConceptoRoutingModule } from './grupo-concepto-routing.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrupoConceptoComponent } from './grupo-concepto.component';
import { SharedModule } from '../shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material-module';
import { ControlesModule } from 'src/app/controles/controles.module';

@NgModule({  
  declarations: [GrupoConceptoComponent, AltaGrupoConceptoComponent],
  imports: [
    CommonModule,
    SharedModule,
    ControlesModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    GrupoConceptoRoutingModule,
    MatFormFieldModule
  ],  
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class GrupoConceptoModule { }
