import { EndosoModel } from './endoso.model';

describe('EndosoModel', () => {
    it('should create an instance', () => {        
        expect(new EndosoModel()).toBeTruthy();
    });

    it('should create an instance with values', () => {
        expect(new EndosoModel({
            cveendoso: 0,
            descendoso: '',
            obsendoso: '',          
            estatusendoso: 0
        })).toBeTruthy();
    });
}); 