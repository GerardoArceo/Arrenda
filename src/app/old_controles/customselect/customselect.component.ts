import { Component, Input, OnDestroy, OnInit, Output,EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BaseControl } from '../base-control';

@Component({
  selector: 'control-customselect',
  templateUrl: './customselect.component.html',
  styleUrls: ['./customselect.component.css']
})
export class CustomselectComponent extends BaseControl implements OnInit, OnDestroy {

  @Input() public secondLabel: string = '';
  @Input() public secondControlName: string = '';
  @Input() public secondPlaceHolder: string = '';
  @Input() public secondValue: any = '';
  @Input() public disabled: boolean = false;
  @Input() public readonly: boolean = false;
  @Input() public helptext: string = '';
  @Input() public required: boolean = false;
  @Input() public max: number = undefined;
  @Input() public min: number = undefined;
  @Input() public spinners: boolean = true;
  @Input() set data(value){
    this._data.next(value);
  }
  get data(){
    return this._data.getValue();
  }
  @Output() public onControlFocusOut = new EventEmitter();

  private _data=new BehaviorSubject<any>('');
  constructor() {
    super();
   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._data.unsubscribe();
    this.onControlFocusOut.unsubscribe();
  }

  controlFocusOut(){
    this.onControlFocusOut.emit(this.control.value);
  }

}
