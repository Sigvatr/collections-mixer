import { Component, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Operation } from '../../models/operation.enum';

@Component({
  selector: 'app-choose-operation',
  templateUrl: './choose-operation.component.html',
  styleUrls: ['./choose-operation.component.scss']
})
export class ChooseOperationComponent {
  public readonly Operation: any = Operation;
  public selectedType: Operation|null = null;

  @Output()
  public operationChoose: EventEmitter<Operation> = new EventEmitter();

  public constructor() {
  }

  public chooseOperation(operation: Operation): void {
    this.selectedType = operation;
    this.operationChoose.emit(this.selectedType);
  }
}
