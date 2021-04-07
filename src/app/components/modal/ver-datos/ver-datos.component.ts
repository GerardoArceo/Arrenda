import { AgrupadoresModel } from './agrupadores.model';
import { CommonModule } from '@angular/common';
import { MonedasModel } from './monedas.model';
import { Component, OnInit, OnDestroy, Inject, ViewChild, TemplateRef, ViewContainerRef } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CatalogosService } from '../../../servicios/catalogos/catalogos.service';
import { ThrowStmt } from '@angular/compiler';
import { TiposBienModel} from './tipos-bien.model';

@Component({
  selector: 'app-ver-datos',
  templateUrl: './ver-datos.component.html',
  styleUrls: ['./ver-datos.component.css']
})
export class VerDatosComponent extends BaseComponent implements OnInit {

  tmpSub: Subscription;

  monedasModel: MonedasModel = new MonedasModel();
  tiposBienModel: TiposBienModel = new TiposBienModel();
  agrupadoresModel: AgrupadoresModel = new AgrupadoresModel();

  constructor(
    public dialogRef: MatDialogRef<VerDatosComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public catalogoService: CatalogosService,
  ) {
    super();
   }

  ngOnInit(): void {
    switch (this.data.type){
      case 'monedas':
        this.getDataMonedas();
        break;
      case 'tipos-bien':
        this.getDataTiposBien();
        break;     
      case 'agrupadores':
      this.getDataAgrupadores();
        break;
    }
  }

  consultaCatalogo(catalog, index, callback) {
    this.tmpSub = catalog.subscribe(response => {
      const item = response.find(prop => prop.ID === index);
      if (item) {
        callback(item.NAME);
      }
    });
    this.Subscriptions.push(this.tmpSub);
  }

  getDataMonedas(){

  }

  getDataAgrupadores(){
    
  }

  getDataTiposBien(){
   this.consultaCatalogo(this.catalogoService.getAgrupadores,this.data.body.cveagrupador, this.setAgrupador); 
  }

  //CALLBACKS TIPOS DE BIEN
  setAgrupador = val => this.tiposBienModel.tiposBienExt.tbdescripcion = val;


  //CALLBACKS VEHICULOS
  //setNombrePlantaVeh = val => this.vehiculosModel.vehiculosExt.nombrePlanta = val;
  
}
