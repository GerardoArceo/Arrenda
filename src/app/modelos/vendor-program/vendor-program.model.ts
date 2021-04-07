import { VendorProgram } from './vendor-program';

export class VendorProgramModel {
    cvevendor;
    descvendor;
    estatusvendor;

    constructor (obj?: VendorProgram){
        this.cvevendor = obj ? obj.cvevendor : null;
        this.descvendor = obj ? obj.descvendor : null;
        this.estatusvendor = obj ? obj.estatusvendor :null;
    }
}
