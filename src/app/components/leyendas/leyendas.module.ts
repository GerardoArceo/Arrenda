import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LeyendasComponent } from './leyendas.component';
import { AltaLeyendasComponent } from './alta-leyendas/alta-leyendas.component';
import { ControlesModule } from './../../controles/controles.module';
import { SharedModule } from '../shared/shared.module';
import { LeyendasRoutingModule } from './leyendas-routing.module';
import { MaterialModule} from 'src/app/material-module';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [LeyendasComponent, AltaLeyendasComponent],
  imports: [
    CommonModule,
    SharedModule,
    ControlesModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    LeyendasRoutingModule,
    MatFormFieldModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA]  
})
export class LeyendasModule { }
