import { FormControl } from '@angular/forms';
import { Input, Component } from '@angular/core';
 
@Component({
  template: ''
})
export class BaseControl {
  @Input()
  public control: FormControl = new FormControl();
  @Input()
  public label: string;
  @Input()
  public placeHolder: string;
  @Input()
  public controlName: string;
}
