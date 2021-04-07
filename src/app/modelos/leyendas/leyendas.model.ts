import { Leyendas } from './leyendas';

export class LeyendasModel {
    idleyenda;
    descleyenda;
    empresaleyenda;
    sirhleyenda;
    regionleyenda;
    tipdoctoleyenda;
    tipoleyenda;          
    estatusleyenda;
    
    constructor (obj?: Leyendas){
        this.idleyenda = obj ? obj.idleyenda : null;
        this.descleyenda = obj ? obj.descleyenda : null;
        this.empresaleyenda = obj ? obj.empresaleyenda : null;
        this.sirhleyenda = obj ? obj.sirhleyenda : null;       
        this.regionleyenda = obj ? obj.regionleyenda : null;
        this.tipdoctoleyenda = obj ? obj.tipdoctoleyenda : null;
        this.tipoleyenda = obj ? obj.tipoleyenda : null;
        this.estatusleyenda = obj ? obj.estatusleyenda : null;
    }
}
