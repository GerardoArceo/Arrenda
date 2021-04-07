import { Endoso } from './endoso';

export class EndosoModel {
    cveendoso;
    descendoso;
    obsendoso;  
    estatusendoso;

    constructor (obj?: Endoso){
        this.cveendoso = obj ? obj.cveendoso : null;
        this.descendoso = obj ? obj.descendoso : null;
        this.obsendoso = obj ? obj.obsendoso : null;       
        this.estatusendoso = obj ? obj.estatusendoso :null;
    }
}
