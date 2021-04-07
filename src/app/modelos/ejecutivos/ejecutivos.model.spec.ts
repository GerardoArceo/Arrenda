import { EjecutivosModel } from './ejecutivos.model';

describe('EjecutivosModel', () =>{
    it('should create an instance', () => {
        expect(new EjecutivosModel()).toBeTruthy();
    });

    it('should create an instance with values', () => {
        expect(new EjecutivosModel({
            cveejecutivo: 0,
            nominaejecutivo: '',
            nombreejecutivo: '',
            telefonoejecutivo: 0,
            correoejecutivo: '',           
            estatusejecutivo: 0
        })).toBeTruthy();
    });
});