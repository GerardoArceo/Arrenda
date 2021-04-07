import { MonedasModel } from './monedas.model';

describe('MonedasModel', () => {
    it('should create an instance', () => {        
        expect(new MonedasModel()).toBeTruthy();
    });

    it('should create an instance with values', () => {
        expect(new MonedasModel({
            cvemoneda: 0,
            nommoneda: '',
            nomcortomoneda: '',
            obsmoneda: '',          
            estatusmoneda: 0
        })).toBeTruthy();
    });
}); 