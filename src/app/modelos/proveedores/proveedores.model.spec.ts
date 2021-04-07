import { ProveedoresModel } from './proveedores.model';

describe('ProveedoresModel', () =>{
    it('should create an instance', () => {
        expect(new ProveedoresModel()).toBeTruthy();
    });
    
    it('should create an instance with values', () => {
        expect(new ProveedoresModel({
            cveproveedor:0,
            nomprov:'',
            fechaaltaprov:'2021-01-01',
            rfcprov:'',
            calleprov:'',
            coloniaprov:'',
            poblacionprov:'',
            cpprov:0,
            estadoprov:'',
            paisprov:'',
            emailprov:'',
            nomcontactoprov:'',
            giroprov:'',
            obsprov:'',
            estatusprov:0
        })).toBeTruthy();
    });
});
