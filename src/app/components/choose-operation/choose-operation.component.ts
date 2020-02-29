import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Operation } from '../../models/operation.enum';
import { OperationMetadata } from '../../models/operation-metadata';


@Component({
  selector: 'app-choose-operation',
  templateUrl: './choose-operation.component.html',
  styleUrls: ['./choose-operation.component.scss']
})
export class ChooseOperationComponent {
  private readonly Operation: any = Operation;

  private errorMessage: string = null;
  private selectedType: Operation|null = null;
  private firstColumnSelection: string;
  private secondColumnSelection: string;

  @Input() columnsForFirstCollection: string[];
  @Input() columnsForSecondCollection: string[];
  @Output() operationChoose: EventEmitter<OperationMetadata> = new EventEmitter();

  constructor() { }

  chooseOperation(operation: Operation): void {
    this.errorMessage = null;
    this.selectedType = operation;
  }

  onRunClick(): void {
    if (!this.selectedType || !this.firstColumnSelection || !this.secondColumnSelection) {
      this.errorMessage = 'Please set all fields';
      return;
    }

    this.operationChoose.emit({
      operation: this.selectedType,
      firstColumn: this.firstColumnSelection,
      secondColumn: this.secondColumnSelection
    });
  }

  onSelectChange(): void {
    this.errorMessage = null;
  }
}
