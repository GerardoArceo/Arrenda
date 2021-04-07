import { MatPaginatorModule } from '@angular/material/paginator';
//Modules
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ControlesModule } from './controles/controles.module';

//import { AngularDualListBoxModule } from 'angular-dual-listbox';

//Components
import { LoginComponent } from './components/login/login.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserbarComponent } from './components/userbar/userbar.component';
import { FootbarComponent } from './components/footbar/footbar.component';
import { ModalComponent } from './components/modal/modal.component';
import { ModalSeleccionComponent } from './components/modal/modalSeleccion.component';
import { ModalSeleccion2Component } from './components/modal/modal-seleccion2/modal-seleccion2.component';

import { AgrupadoresComponent } from './components/agrupadores/agrupadores.component';
import { AltaAgrupadoresComponent } from './components/agrupadores/alta-agrupadores.component';
import { AltaAseguradorasComponent } from './components/aseguradoras/alta-aseguradoras.component';
import { AseguradorasComponent } from './components/aseguradoras/aseguradoras.component';
import { CaracteristicasComponent } from './components/caracteristicas/caracteristicas.component';
import { AltaCaracteristicasComponent } from './components/caracteristicas/alta-caracteristicas.component';
import { diasinhabilesComponent } from './components/dias-inhabiles/dias-inhabiles.component';
import { AltaDiasInhabilesComponent } from './components/dias-inhabiles/alta-dias-inhabiles.component';
import { GuardarBienComponent } from './components/modal/guardar-bien/guardar-bien.component';
import { PopupComponent } from './components/modal/popup/popup.component';
import { SeleccionComponent } from './components/modal/seleccion/seleccion.component';

//Services
import { ValidaSesionService } from './components/login/validaSesion.service';
import { ServiceService } from './components/services/service.service';
import { ModelService } from './components/services/model.service';
import { CurrencyMaskService } from './servicios/currencyMask/currency-mask.service';
import { Validaciones } from './components/validaciones';
import { VerDatosComponent } from './components/modal/ver-datos/ver-datos.component';

//Directives
//import { CurrencyMaskDirective } from './directives/currencyMask/currency-mask.directive';

@NgModule({
  entryComponents: [ModalComponent, ModalSeleccionComponent],
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    UserbarComponent,
    FootbarComponent,
    VerDatosComponent,
  
    AseguradorasComponent,
    AltaAseguradorasComponent,  
    CaracteristicasComponent,
    AltaCaracteristicasComponent,
    AltaDiasInhabilesComponent,
    diasinhabilesComponent,

    GuardarBienComponent,
    PopupComponent,
    SeleccionComponent,

    ModalComponent,
    ModalSeleccionComponent,
    ModalSeleccion2Component,
    LoginComponent    
   // CurrencyMaskDirective, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,    
    HttpClientModule,
    ControlesModule,
    MatPaginatorModule
    //AngularDualListBoxModule
  ], 
  providers: [ServiceService, ModelService, ValidaSesionService, CurrencyMaskService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
