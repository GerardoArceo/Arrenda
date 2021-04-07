import { GrupoConceptoModel } from './grupo-concepto.model';

describe('GrupoConceptoModel', () =>{
    it('should create an instance', () => {
        expect(new GrupoConceptoModel()).toBeTruthy();
    });

    it('should create an instance with values', () => {
        expect(new GrupoConceptoModel({
            cvegrupoconcepto: 0,
            gcgrupo: 0,
            gcconcepto: 0,
            gcdescripcion: '',
            gcestatus: 0
        })).toBeTruthy();
    });
});