import { Agrupador } from './../agrupadores/Agrupador';
import { Aseguradora } from './../aseguradoras/Aseguradora';
import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
  } from '@angular/material/snack-bar';
  

/** Constants used to fill up our Aseguradoras. */
const NAMES_aseguradoras: string[] = [
    'SEGUROS MAPFRE TEPEYAC',  'AIG MEXICO SEGUROS INTERAMERICANA',  'QUALITAS COMPAîIA DE SEGUROS',  'SEGUROS ATLAS',  'ALLIANZ MEXICO',
    '(BAJA) KEMPER MEXICO',  '(BAJA) LA PENINSULAR SEGUROS',  '(BAJA) BBV-PROBURSA',  'ACE SEGUROS',  'ROYAL & SUNALLIANCE SEGUROS',  '(BAJA) SEGUROS EL POTOSI S.A.',
    '(BAJA) GENERAL DE SEGUROS, S.A.',  '(BAJA) SEGUROS DEL CENTRO SA DE CV',  'CHUBB DE MEXICO, CIA DE SEGUROS, S.A',  'SEGUROS BANCOMER',
    '(BAJA) LA LATINOAMERICANA',  '(BAJA) ANA COMPAÐIA DE SEGUROS SA CV',  '(BAJA) GPO MEXICANO DE SEGUROS GMX',  '(BAJA) METROPOLITANA CIA ASEGURADORA',
    '(BAJA) GRUPO MEXICANO DE SEGUROS SA',  '(BAJA) SEGUROS AFIRME',  '(BAJA) CUMBRES CIA.DE SEGUROS SA CV',  'Seguros Banorte-Generali',  'AIG MEXICO CIA. DE SEGUROS DE VIDA',
    'GERLING DE MEXICO SEGUROS',  'HSBC SEGUROS',  'MAPFRE SEGUROS DE CREDITO',  'METLIFE MEXICO',  'PRINCIPAL MEXICO, CIA. DE SEGUROS',  'PRUDENTIAL SEGUROS MEXICO',
    'SEGUROS BANAMEX',  'SEGUROS BANCOMEXT',  'SEGUROS MONTERREY NEW YORK LIFE',  'SOMPO JAPAN INSURANCE',  'XL INSURANCE DE MEXICO',  'TOKIO MARINE CIA. DE SEGUROS'
  ];

/** Constants used to fill up our Agrupadores. */
const NAMES_agrupadores: string[] = [
    'GRAL MAQUINARIA Y EQUIPO INDUSTRIAL','SIN CARACTERISTICAS','CUALQUIER CHASIS CABINA','AUTOMOVILES O PICK UPs','CUALQUIER TRACTOCAMION',
  'CUALQUIER REMOLQUE','CARACTERISTICAS PARA SERVIDORES','CARACTERISTICAS PARA DESK TOPS','CARACTERISTICAS PARA LAP TOPS','CARAC. ESTACIONES DE TRABAJO',
  'CARACTARISTICAS DE IMPRESORAS','CARACTERISTICAS DE GRAFICADORES','CARACTERISTICAS DE SCANNERS','CARACTERISTICAS DE CONMUTADORES',
  'CARACTERISTICAS DE FAXES','caracteristica treinta y tres','caracteristica treinta y cuatro','AGRUPADOR CANCELADO','AGRUPADOR CANCELADO',
  'AGRUPADOR CANCELADO','AGRUPADOR CANCELADO'
  ];

@Injectable({
    providedIn: 'root'
})
export class ModelService {
    horizontalPosition: MatSnackBarHorizontalPosition = 'end';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    durationInSeconds = 5;
    private data = null;
    private aseguradoras: Aseguradora[];
    private agrupadores: Agrupador[];
    
    constructor(
        private _snackBar: MatSnackBar,
        private router: Router
    ) {
        this.data = null;
        this.aseguradoras = Array.from({length: 100}, (_, k) => createNewAseguradora(k + 1));
        this.agrupadores = Array.from({length: 100}, (_, k) => createNewAgrupadores(k + 1));
    }

    setData(data) {        
        this.data = data;
    }

    getData() {
        let temp = this.data;
        this.clearData();
        return temp;
    }

    clearData() {
        this.data = null;
    }

    //Metodos catalogo ASEGURADORAS
    getAllAseguradoras(){
        return this.aseguradoras;
    }

    saveAseguradora(aseguradora: Aseguradora){
        this.aseguradoras.push(aseguradora);

        this.router.navigate(['arrendadora/aseguradoras']);
        this.alertaSuccess("Operación realizada con éxito");        
    }

    updateAseguradora(aseguradora: Aseguradora){
        
        let oldAseguradora = this.aseguradoras.find(x=>x.ASG_CVE_ASEGURADORA === aseguradora.ASG_CVE_ASEGURADORA);
        oldAseguradora.ASG_CVE_ASEGURADORA = aseguradora.ASG_CVE_ASEGURADORA;
        oldAseguradora.ASG_DIAS_ACORDADOS = aseguradora.ASG_DIAS_ACORDADOS;
        oldAseguradora.ASG_NOM_ASEGURADORA = aseguradora.ASG_NOM_ASEGURADORA;
        oldAseguradora.ASG_OBS = aseguradora.ASG_OBS;

        this.router.navigate(['arrendadora/aseguradoras']);
        this.alertaSuccess("Operación realizada con éxito");    
    }

    getAseguradoraNewId()
    {
        var max = Math.max(...this.aseguradoras.map(o => o.ASG_CVE_ASEGURADORA));       
        return  max + 1;
    }

    //Metodos catalogo AGRUPADORES
    getAllAgrupadores(){
        return this.agrupadores;
    }

    saveAgrupador(agrupador: Agrupador){
        this.agrupadores.push(agrupador);

        this.router.navigate(['arrendadora/agrupadores']);
        this.alertaSuccess("Operación realizada con éxito");        
    }

    updateAgrupador(agrupador: Agrupador){
        
        let oldAgrupador = this.agrupadores.find(x=>x.AGR_CVE_AGRUPADOR === agrupador.AGR_CVE_AGRUPADOR);
        oldAgrupador.AGR_CVE_AGRUPADOR = agrupador.AGR_CVE_AGRUPADOR;
        oldAgrupador.AGR_DESC_AGRUPADOR = agrupador.AGR_DESC_AGRUPADOR;
        
        this.router.navigate(['arrendadora/agrupadores']);
        this.alertaSuccess("Operación realizada con éxito");    
    }

    getAgrupadorNewId()
    {
        var max = Math.max(...this.agrupadores.map(o => o.AGR_CVE_AGRUPADOR));       
        return  max + 1;
    }

    //Mensaje de operación exitosa
    alertaSuccess(msj: string) {
        this._snackBar.open(msj, '', {
          duration: this.durationInSeconds * 1000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          panelClass: "alerta-success"
        });
      }


}

function createNewAseguradora(id: number): Aseguradora {
    const name = NAMES_aseguradoras[Math.round(Math.random() * (NAMES_aseguradoras.length - 1))] + ' ' +
        NAMES_aseguradoras[Math.round(Math.random() * (NAMES_aseguradoras.length - 1))].charAt(0) + '.';
  
    return {
      ASG_CVE_ASEGURADORA: id,
      ASG_NOM_ASEGURADORA: name,
      ASG_DIAS_ACORDADOS: "1",
      ASG_OBS:"Observaciones",
      Acciones: ""
    };     
  }

  function createNewAgrupadores(id: number): Agrupador {
    const name = NAMES_agrupadores[Math.round(Math.random() * (NAMES_agrupadores.length - 1))] + ' ' +
    NAMES_agrupadores[Math.round(Math.random() * (NAMES_agrupadores.length - 1))].charAt(0) + '.';
  
    return {
      AGR_CVE_AGRUPADOR: id,
      AGR_DESC_AGRUPADOR: name,
      Acciones: ""
    };
  }

