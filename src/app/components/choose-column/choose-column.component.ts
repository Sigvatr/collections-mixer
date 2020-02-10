import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-choose-column',
  templateUrl: './choose-column.component.html',
  styleUrls: ['./choose-column.component.scss']
})
export class ChooseColumnComponent {

  @Input() selectedColumn: string;
  @Input() columns: string[];
  @Output() selectedColumnChange = new EventEmitter<string>();

  constructor() { }
}
