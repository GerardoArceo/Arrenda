import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MaterialModule } from 'src/app/material-module';
import { ControlesModule } from './../../controles/controles.module';
import { SharedModule } from './../shared/shared.module';
import { CommonModule } from '@angular/common';
import { AltaAgrupadoresComponent } from './alta-agrupadores.component';
import { AgrupadoresComponent } from './agrupadores.component';
import { NgModel, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgrupadoresRoutingModule } from './agrupadores-routing.module';

@NgModule({
    declarations: [AgrupadoresComponent, AltaAgrupadoresComponent],
    imports: [
      CommonModule,
      SharedModule,
      ControlesModule,
      MaterialModule,
      FormsModule,
      ReactiveFormsModule,
      AgrupadoresRoutingModule,
      MatFormFieldModule
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA]  
  })
export class AgrupadoresModule {
}
