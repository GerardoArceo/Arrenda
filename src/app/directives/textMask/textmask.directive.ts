import { Directive, HostListener, Input, ElementRef, OnInit, EventEmitter, Output } from '@angular/core';

const placeholders = {
  'A': '^[a-zA-ZA-zА-яЁё]',
  '0': '\\d'
};

const keys = {
  'BACKSPACE': 8,
  'LEFT': 37,
  'RIGHT': 39,
  'DEL': 46,
  'ENTER': 13
};


interface IState {
  value: string;
}

@Directive({
  selector: '[TextMask]'
})
export class TextMaskDirective implements OnInit {

  private state: IState;

  @Input() TextMask: any;
  @Output() ngModelChange = new EventEmitter();

  /**
   *
   * @param element
   * @param model
   */
  constructor(private element?: ElementRef) {
    this.state = {
      value: this.getValue()
    };
  }


  /**
   *
   */
  @HostListener('input')
  public onChange(): void {
    this.applyMask(this.getClearValue(this.getValue()));
  }

  /**
   *
   * @param event
   */
  @HostListener('keypress', ['$event'])
  public onKeyPress(event): void {
    if (!this.TextMask) { return; }
    const key = this.getKey(event);
    if (key === keys.BACKSPACE || key === keys.LEFT || key === keys.RIGHT) { return; }

    const cursorPosition = this.getCursorPosition();
    let regexp = this.createRegExp(cursorPosition);
    if (regexp != null && !regexp.test(event.key) || this.getValue().length >= this.TextMask.length) {
      if (key === keys.ENTER) { return; }
      event.preventDefault();
    }
  }

  /**
   *
   * @param event
   */
  @HostListener('keydown', ['$event'])
  public onKeyDown(event): void {
    const key = this.getKey(event);
    if ((key === keys.BACKSPACE || key === keys.DEL) && this.getClearValue(this.getValue()).length === 1) {
      this.setValue('');
      this.state.value = '';
      this.ngModelChange.emit('');
    }
  }

  /**
   *
   */
  public ngOnInit(): void {
    this.applyMask(this.getClearValue(this.getValue()));
  }

  /**
   *
   * @param event
   * @returns {number}
   */
  private getKey(event) {
    return event.keyCode || event.charCode;
  }

  /**
   *
   * @param value
   */
  private applyMask(value): void {
    if (!this.TextMask) { return; }
    let newValue = '';
    let maskPosition = 0;

    if (this.getClearValue(value).length > this.getClearValue(this.TextMask).length) {
      this.setValue(this.state.value);
      return;
    }

    for (let i = 0; i < value.length; i++) {
      let current = value[i];

      let regexp = this.createRegExp(maskPosition);
      if (regexp != null) {
        if (!regexp.test(current)) {
          this.setValue(this.state.value);
          break;
        }
        newValue += current;
      } else if (this.TextMask[maskPosition] === current) {
        newValue += current;
      } else {
        newValue += this.TextMask[maskPosition];
        i--;
      }

      maskPosition++;
    }

    const nextMaskElement = this.TextMask[maskPosition];
    if (value.length && nextMaskElement != null && /^[-\/\\^$#&@№:<>_\^!*+?.()|\[\]{}]/.test(nextMaskElement)) {
      newValue += nextMaskElement;
    }

    const oldValue = this.state.value;
    const cursorPosition = this.getCursorPosition();
    this.setValue(newValue);
    this.state.value = newValue;

    if (oldValue.length >= cursorPosition) {
      this.setCursorPosition(cursorPosition);
    }

  }

  /**
   *
   * @param position
   * @returns {any}
   */
  private createRegExp(position): RegExp | null {
    if (!this.TextMask) { return; }
    if (this.TextMask[position] == null) {
      return null;
    }

    const currentSymbol = this.TextMask[position].toUpperCase();
    const keys = Object.keys(placeholders);
    const searchPosition = keys.indexOf(currentSymbol);
    if (searchPosition >= 0) {
      return new RegExp(placeholders[keys[searchPosition]], 'gi');
    }
    return null;
  }


  /**
   *
   * @returns {any}
   */
  private getValue(): string {
    if (this.element!=null) {
      return this.element.nativeElement.value;
    } else {
      return '';
    }
  }

  /**
   *
   * @param value
   * @returns {string}
   */
  private getClearValue(value): string {
    return value.trim().replace(/[-\/\\^$#&@№:<>_\^!*+?.()|\[\]{}]/gi, '');
  }

  /**
   *
   * @param value
   */
  private setValue(value: string): void {
    this.element.nativeElement.value = value;
  }

  /**
   *
   * @returns {number}
   */
  private getCursorPosition(): number {
    return this.element.nativeElement.selectionStart;
  }

  /**
   *
   * @param start
   * @param end
   */
  private setCursorPosition(start: number, end: number = start): void {
    this.element.nativeElement.setSelectionRange(start, end);
  }

}
