import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FacturaService } from 'src/app/servicios/factura/factura.service';
import { Loading } from 'src/app/utilities/Loading';

@Component({
  selector: 'app-dialog',
  templateUrl: './guardar-bien.component.html',
  styleUrls: ['./guardar-bien.component.css']
})
export class GuardarBienComponent implements OnInit {

  form: FormGroup;
  caracteristicas: any = [];

  constructor(
    public dialogRef: MatDialogRef<GuardarBienComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private facturaService: FacturaService
  ) { }

  ngOnInit(): void {

    if (this.data.bien.editMode && this.data.bien.itemToSave && this.data.bien.itemToSave.CARACTERISTICAS.length>0) {
      this.caracteristicas = [...this.data.bien.itemToSave.CARACTERISTICAS];
      let fb = {};
      for (const c of this.caracteristicas) {
        fb[c.CRC_DESC_CARACTERISTICA] = [c.ITEM_DESC_ITEM, Validators.required];
      }
      this.form = this.formBuilder.group(fb);
    } else {
      console.log(this.data.bien);
      Loading.show();
      this.facturaService.getCaracteristicasBien(this.data.bien.TB_ID_TIPOBIEN).subscribe(a => {
        Loading.hide();
        if (!a.data) {
          return;
        }
        this.caracteristicas = a.data.caracterisitica;
        let fb = {};
        for (const c of this.caracteristicas) {
          fb[c.CRC_DESC_CARACTERISTICA] = ['', Validators.required];
        }
        this.form = this.formBuilder.group(fb);
      });
    }
  }

  guardar() {
    const itemToSave: any = {
      AGR_CVE_AGRUPADOR: this.data.bien.AGR_CVE_AGRUPADOR,
      TB_ID_TIPOBIEN: this.data.bien.TB_ID_TIPOBIEN,
    }
    
    itemToSave.CARACTERISTICAS = [];
    for (const c of Object.entries(this.form.value)) {
      const caracteristicas = {
        CRC_CVE_CARACTERISTICA: this.caracteristicas.find(car => car.CRC_DESC_CARACTERISTICA === c[0]).CRC_CVE_CARACTERISTICA,
        CRC_DESC_CARACTERISTICA: c[0],
        ITEM_DESC_ITEM: c[1],
      }
      itemToSave.CARACTERISTICAS.push(caracteristicas);
    }

    this.data.bien.itemToSave = itemToSave;
    this.dialogRef.close(this.data.bien);
  }

}
