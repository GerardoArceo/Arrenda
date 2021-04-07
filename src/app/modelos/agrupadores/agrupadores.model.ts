import { Agrupadores } from './agrupadores';

export class AgrupadoresModel {
    cveagrupador;
    descagrupador;
    estatusagrupador;

    constructor (obj?: Agrupadores){
        this.cveagrupador = obj ? obj.cveagrupador : null;
        this.descagrupador = obj ? obj.descagrupador : null;
        this.estatusagrupador = obj ? obj.estatusagrupador : null;
    }
}
