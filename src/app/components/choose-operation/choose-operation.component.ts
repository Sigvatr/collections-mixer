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
  private readonly Operation: any = Operation;

  private selectedType: Operation|null = null;
  private firstColumnSelection: string;
  private secondColumnSelection: string;

  @Input() columnsForFirstCollection: string[];
  @Input() columnsForSecondCollection: string[];
  @Output() operationChoose: EventEmitter<OperationMetadata> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  chooseOperation(operation: Operation) {
    this.selectedType = operation;
  }

  onRunClick() {
    this.operationChoose.emit({
      operation: this.selectedType,
      firstColumn: this.firstColumnSelection,
      secondColumn: this.secondColumnSelection
    });
  }
}
