import { VendorProgramModel } from './vendor-program.model';

describe('VendorProgramModel', () => {
    it('should create an instance', () => {        
        expect(new VendorProgramModel()).toBeTruthy();
    });

    it('should create an instance with values', () => {
        expect(new VendorProgramModel({
            cvevendor: 0,
            descvendor: '',
            estatusvendor: 0
        })).toBeTruthy();
    });
}); 