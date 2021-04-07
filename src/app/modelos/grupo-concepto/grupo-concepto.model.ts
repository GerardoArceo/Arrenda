import { GrupoConcepto } from './grupo-concepto';
import { object } from 'prop-types';

export class GrupoConceptoModel {
    cvegrupoconcepto;
    gcgrupo;
    gcconcepto;
    gcdescripcion;
    gcestatus;

    constructor(obj?: GrupoConcepto){
        this.cvegrupoconcepto = obj ? obj.cvegrupoconcepto : null;
        this.gcgrupo = obj ? obj.gcgrupo : null;
        this.gcconcepto = obj ? obj.gcconcepto : null;
        this.gcdescripcion = obj ? obj.gcdescripcion : null;
        this.gcestatus = obj ? obj.gcestatus : null;
    }
}
