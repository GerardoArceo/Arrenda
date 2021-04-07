import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BaseControl } from '../base-control';

@Component({
  selector: 'control-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent extends BaseControl implements OnInit, OnDestroy {

  @Input() public disabled: boolean = false;
  @Input() public readonly: boolean = false;
  @Input() public helptext: string = '';
  @Input() public required: boolean = false;
  @Input() public maxLength: number = undefined;
  @Input() public minLength: number = undefined;
  @Output() public eventValueChange = new EventEmitter();

  constructor() {
    super();
  }

  ngOnInit(): void {
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
