import { Component, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Operation } from '../../models/operation.enum';


@Component({
  selector: 'app-choose-operation',
  templateUrl: './choose-operation.component.html',
  styleUrls: ['./choose-operation.component.scss']
})
export class ChooseOperationComponent {
  private readonly Operation: any = Operation;

  private selectedType: Operation|null = null;

  @Output() operationChoose: EventEmitter<Operation> = new EventEmitter();

  constructor() { }

  chooseOperation(operation: Operation): void {
    this.selectedType = operation;
    this.operationChoose.emit(this.selectedType);
  }
}
