import { StatusModel } from './status.model';

describe('StatusModel', () =>{
    it('should create an instance', () => {
        expect(new StatusModel()).toBeTruthy();
    });

    it('should create an instance with values', () => {
        expect(new StatusModel({
            idstatus: 0,
            nomtablastatus: '',
            clavestatus: 0,
            descstatus: '',
            obsstatus: '',
            estatusstatus: 0
        })).toBeTruthy();
    });
});