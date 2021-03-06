import { Component, EventEmitter, Injectable, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDateFormats, NativeDateAdapter } from '@angular/material/core';
import { BaseControl } from '../base-control';

@Injectable({
  providedIn: 'root'
})
export class AppDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      let day: string = date.getDate().toString();
      day = +day < 10 ? '0' + day : day;
      let month: string = (date.getMonth() + 1).toString();
      month = +month < 10 ? '0' + month : month;
      let year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }
    return date.toLocaleDateString();
  }
}
export const APP_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
  },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'numeric' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric'
    },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  }
};

@Component({
  selector: 'control-datepicker-material',
  templateUrl: './datepicker-material.component.html',
  styleUrls: ['./datepicker-material.component.css'],

})
export class DatepickerMaterialComponent extends BaseControl implements OnInit, OnDestroy {

  @Input() public required: boolean = false;
  @Input() public disabled: boolean = false;
  @Input() public readonly: boolean = false;
  @Input() public focusedDate: string = '';
  @Input() public helptext: string = '';
  @Input() public minDate: Date;
  @Input() public maxDate: Date;
  @Input() public format: string = 'dd/MM/yyyy';
  @Output() public eventValueChange = new EventEmitter();

  constructor() {
    super();
   }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.eventValueChange.unsubscribe();
  }

  functionValueChange(event){
    if(event==''){
      this.eventValueChange.emit(null);
      return;
    }
    this.eventValueChange.emit(event);
  }

}
