import { TiposBien } from './tipos-bien';

export class TiposBienModel {
    idtipobien;
    tbcvefamilia;
    tbcvegenerico;
    tbcvedivision;
    tbcvegrupo;
    tbcvesubgrupo;
    tbcveespecifico;
    cveagrupador;
    tbdescripcion;
    tbvidautil;
    tbdictaminar;
    tbfacdepreciacion;
    tbcvecurva;
    tbtipogar;
    tbestatus;

    constructor (obj?: TiposBien){
        this.idtipobien = obj ? obj.idtipobien :null;
        this.tbcvefamilia  = obj ? obj.tbcvefamilia :null;
        this.tbcvegenerico  = obj ? obj.tbcvegenerico :null;
        this.tbcvedivision  = obj ? obj.tbcvedivision :null;
        this.tbcvegrupo  = obj ? obj.tbcvegrupo :null;
        this.tbcvesubgrupo  = obj ? obj.tbcvesubgrupo :null;
        this.tbcveespecifico  = obj ? obj.tbcveespecifico :null;
        this.cveagrupador  = obj ? obj.cveagrupador :null;
        this.tbdescripcion  = obj ? obj.tbdescripcion :null;
        this.tbvidautil  = obj ? obj.tbvidautil :null;
        this.tbdictaminar  = obj ? obj.tbdictaminar :null;
        this.tbfacdepreciacion  = obj ? obj.tbfacdepreciacion :null;
        this.tbcvecurva  = obj ? obj.tbcvecurva :null;
        this.tbtipogar  = obj ? obj.tbtipogar :null;
        this.tbestatus  = obj ? obj.tbestatus :null;
    }
}
