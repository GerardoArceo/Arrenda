import { TiposBienModel } from './tipos-bien.model';

describe('TiposBienModel', () => {
    it('should create an instance', () => {        
        expect(new TiposBienModel()).toBeTruthy();
    });

    it('should create an instance with values', () => {
        expect(new TiposBienModel({
            idtipobien : 0,
            tbcvefamilia : 0,
            tbcvegenerico : 0,
            tbcvedivision : 0,
            tbcvegrupo : 0,
            tbcvesubgrupo : 0,
            tbcveespecifico : 0,
            cveagrupador : 0,
            tbdescripcion : '',
            tbvidautil : 0,
            tbdictaminar : 0,
            tbfacdepreciacion : 0,
            tbcvecurva : '',
            tbtipogar : '',
            tbestatus : 0
        })).toBeTruthy();
    });
}); 