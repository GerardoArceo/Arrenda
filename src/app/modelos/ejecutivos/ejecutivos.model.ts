import { Ejecutivos } from './ejecutivos';
import { object } from 'prop-types';

export class EjecutivosModel {
    cveejecutivo;
    nominaejecutivo;
    nombreejecutivo;
    telefonoejecutivo;
    correoejecutivo;
    estatusejecutivo;

    constructor(obj?: Ejecutivos){
        this.cveejecutivo = obj ? obj.cveejecutivo : null;
        this.nominaejecutivo = obj ? obj.nominaejecutivo : null;
        this.nombreejecutivo = obj ? obj.nombreejecutivo : null;
        this.telefonoejecutivo = obj ? obj.telefonoejecutivo : null;
        this.correoejecutivo = obj ? obj.correoejecutivo : null;
        this.estatusejecutivo = obj ? obj.estatusejecutivo : null;      
    }
}
