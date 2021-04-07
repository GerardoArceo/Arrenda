import { AgrupadoresModel } from './agrupadores.model';

describe('AgrupadoresModel', () => {
    it('should create an instance', () => {        
        expect(new AgrupadoresModel()).toBeTruthy();
    });

    it('should create an instance with values', () => {
        expect(new AgrupadoresModel({
            cveagrupador : 0,
            descagrupador : '',
            estatusagrupador : 0
        })).toBeTruthy();
    });
}); 