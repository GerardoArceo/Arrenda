import { Proveedores } from './proveedores';
import { object } from 'prop-types';
import { TransformDate } from 'src/app/utilities/FechaString';

export class ProveedoresModel {
    cveproveedor;
    nomprov;
    fechaaltaprov;
    rfcprov;
    calleprov;
    coloniaprov;
    poblacionprov;
    cpprov;
    estadoprov;
    paisprov;
    emailprov;
    nomcontactoprov;
    giroprov;
    obsprov;
    estatusprov;

    constructor(obj?: Proveedores){
        if (obj != null){
            
            obj.cveproveedor = (obj.cveproveedor.toString()).length>0? obj.cveproveedor : null;            
            obj.nomprov = (obj.nomprov).length>0? obj.nomprov : null;
            obj.fechaaltaprov = (obj.fechaaltaprov.toString()).length>0? (obj.fechaaltaprov) : TransformDate.dateAsString(new Date(Date.now()));
            obj.rfcprov = (obj.rfcprov).length>0? obj.rfcprov : null;
            obj.calleprov = (obj.calleprov).length>0? obj.calleprov : null;
            obj.coloniaprov = (obj.coloniaprov).length>0? obj.coloniaprov : null;
            obj.poblacionprov = (obj.poblacionprov).length>0? obj.poblacionprov : null;
            obj.cpprov = (obj.cpprov.toString()).length>0? obj.cpprov : 0;
            obj.estadoprov = (obj.estadoprov).length>0? obj.estadoprov : null;
            obj.paisprov = (obj.paisprov).length>0? obj.paisprov : null;
            obj.emailprov = (obj.emailprov).length>0? obj.emailprov : null;
            obj.nomcontactoprov = (obj.nomcontactoprov).length>0? obj.nomcontactoprov : null;
            obj.giroprov = (obj.giroprov).length>0? obj.giroprov : null;
            obj.obsprov = (obj.obsprov).length>0? obj.obsprov : null;
            obj.estatusprov = (obj.estatusprov.toString()).length>0? obj.estatusprov : null;   
        }
        this.cveproveedor = obj ? obj.cveproveedor : null;
        this.nomprov = obj ? obj.nomprov : null;        
        this.fechaaltaprov = obj ? TransformDate.fechaAsString(obj.fechaaltaprov) : TransformDate.dateAsString(new Date(Date.now()));
        this.rfcprov  = obj ? obj.rfcprov : null;
        this.calleprov = obj ? obj.calleprov : null;
        this.coloniaprov = obj ? obj.coloniaprov : null;
        this.poblacionprov = obj ? obj.poblacionprov : null;
        this.cpprov = obj ? obj.cpprov : null;
        this.estadoprov = obj ? obj.estadoprov : null;
        this.paisprov = obj ? obj.paisprov : null;
        this.emailprov = obj ? obj.emailprov : null;
        this.nomcontactoprov = obj ? obj.nomcontactoprov : null;
        this.giroprov = obj ? obj.giroprov : null;
        this.obsprov = obj ? obj.obsprov : null;
        this.estatusprov = obj ? obj.estatusprov : null;
    }    
}
