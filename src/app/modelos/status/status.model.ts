import { Status } from './status';
import { object } from 'prop-types';

export class StatusModel {
    idstatus;
    nomtablastatus;
    clavestatus;
    descstatus;
    obsstatus;
    estatusstatus;

    constructor(obj?: Status){
        this.idstatus = obj ? obj.idstatus : null;
        this.nomtablastatus = obj ? obj.nomtablastatus : null;
        this.clavestatus = obj ? obj.clavestatus : null;
        this.descstatus = obj ? obj.descstatus : null;
        this.obsstatus = obj ? obj.obsstatus : null;
        this.estatusstatus = obj ? obj.estatusstatus : null;
    }
}
