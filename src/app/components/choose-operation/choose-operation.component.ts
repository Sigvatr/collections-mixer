import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Operation } from '../../models/operation.enum';
import { OperationMetadata } from '../../models/operation-metadata';


@Component({
  selector: 'app-choose-operation',
  templateUrl: './choose-operation.component.html',
  styleUrls: ['./choose-operation.component.scss']
})
export class ChooseOperationComponent implements OnInit {
  private operationType: Operation;
  private firstColumnSelection: string;
  private secondColumnSelection: string;

  @Input() columnsForFirstCollection: string[];
  @Input() columnsForSecondCollection: string[];
  @Output() operationChoose: EventEmitter<OperationMetadata> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  operationSet() {
    return Object.keys(Operation)
      .filter(e => isNaN(+e))
      .map(key => ({
        value: +Operation[key],
        label: key
          .replace(/([A-Z])/g, ' $1')
          .toUpperCase()
      }));
  }

  onRunClick() {
    this.operationChoose.emit({
      operation: this.operationType,
      firstColumn: this.firstColumnSelection,
      secondColumn: this.secondColumnSelection
    });
  }
}
