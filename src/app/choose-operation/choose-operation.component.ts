import { Component, OnInit, Input, Output } from '@angular/core';
import { ColumnMetaData } from '../models/column-meta-data';
import { EventEmitter } from '@angular/core';
import { Operation } from '../models/operation.enum';

@Component({
  selector: 'app-choose-operation',
  templateUrl: './choose-operation.component.html',
  styleUrls: ['./choose-operation.component.scss']
})
export class ChooseOperationComponent implements OnInit {
  private operationType: Operation;

  @Input() columnsForFirstCollection: ColumnMetaData[];
  @Input() columnsForSecondCollection: ColumnMetaData[];
  @Output() operationChoose: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  operationSet() {
    return Object.keys(Operation)
      .filter(e => isNaN(+e))
      .map(key => ({
        value: Operation[key],
        label: key
          .replace(/([A-Z])/g, ' $1')
          .toUpperCase()
      }));
  }

  onRunClick() {
    this.operationChoose.emit({
      operation: this.operationType
    });
  }
}
