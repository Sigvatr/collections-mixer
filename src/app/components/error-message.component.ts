import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-error-message',
  template: `<span *ngIf="value">{{ value }}</span>`,
  styles: [`
span {
    display         : block;
    background-color: #fa4747;
    margin          : 2px;
    padding         : 5px 10px;
    font-family     : Verdana, Geneva, Tahoma, sans-serif;
}`]
})
export class ErrorMessageComponent {

  @Input() value: string = null;

  constructor() { }
}
