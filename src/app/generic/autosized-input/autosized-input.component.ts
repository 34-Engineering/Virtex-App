import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';

@Component({
  selector: 'app-autosized-input',
  template: `
    <mat-form-field appearance="fill" class="autosized-input" (focusout)="resize()">
      <mat-label #labelEl (change)="resize()">{{ label }}</mat-label>
      <input matInput matAutosize [value]="value" [disabled]="disabled" #inputEl
            (input)="resize(); this.value = inputEl.value" (change)="resize()" [type]="type || 'text'">
    </mat-form-field>
  `,
  styles: [`
    ::ng-deep .autosized-input input {
      word-break: keep-all;
      display: block;
      white-space: nowrap;
      min-width: 10px;
    }
    
    ::ng-deep .autosized-input mat-label {
      word-break: keep-all;
      display: block;
      white-space: nowrap;
    }
    
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  `]
})
export class AutosizedInputComponent implements AfterViewInit {
  @Input() label;
  @Input() value;
  @Input() disabled : boolean;
  @Input() type;
  @ViewChild('inputEl') inputEl;
  @ViewChild('labelEl') labelEl;
  defaultValue = '';

  constructor(private hostEl : ElementRef) {

  }

  ngAfterViewInit(): void {
    this.resize();
    this.defaultValue = this.value;
  }

  resize(): void {
    const masterNativeEl = this.hostEl.nativeElement.querySelector('.mat-form-field-infix');
    const inputText = this.inputEl.nativeElement.value;
    const labelText = this.labelEl.nativeElement.innerText;
    const expanded = inputText.length > 0;
    const fontString = 'normal normal 400 14px/15.75px Roboto, "Helvetica Neue", sans-serif';
    let width = getTextWidth(labelText, fontString);
    if (expanded) {
      width = Math.max(
          getTextWidth(inputText, fontString),
          getTextWidth(labelText, fontString) * 0.75
      );
    }
    masterNativeEl.style.width = Math.ceil(width) + 'px';
  }

  setToDefault(): void {
    this.value = this.defaultValue;
  }
}

export function getTextWidth(text, font) {
  // @ts-ignore
  let canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
  let context = canvas.getContext("2d");
  context.font = font;
  return context.measureText(text).width;
}
