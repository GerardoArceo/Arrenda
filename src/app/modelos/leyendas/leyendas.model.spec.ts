import { LeyendasModel } from './leyendas.model';

describe('LeyendasModel', () => {
    it('should create an instance', () => {        
        expect(new LeyendasModel()).toBeTruthy();
    });

    it('should create an instance with values', () => {
        expect(new LeyendasModel({
            idleyenda: 0,
            descleyenda: '',
            empresaleyenda: 0,
            sirhleyenda: 0,
            regionleyenda: 0,
            tipdoctoleyenda: 0,
            tipoleyenda: 0,          
            estatusleyenda: 0
        })).toBeTruthy();
    });
}); 