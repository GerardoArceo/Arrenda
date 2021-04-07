import { Monedas } from './monedas';

export class MonedasModel {
    cvemoneda;
    nommoneda;
    nomcortomoneda;
    obsmoneda;  
    estatusmoneda;

    constructor (obj?: Monedas){
        this.cvemoneda = obj ? obj.cvemoneda : null;
        this.nommoneda = obj ? obj.nommoneda : null;
        this.nomcortomoneda = obj ? obj.nomcortomoneda : null;
        this.obsmoneda = obj ? obj.obsmoneda : null;       
        this.estatusmoneda = obj ? obj.estatusmoneda :null;
    }
}
