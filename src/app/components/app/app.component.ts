import { Component } from '@angular/core';
import { JoinService } from '../../services/join.service';
import { Operation } from '../../models/operation.enum';
import { ParserService } from '../../services/parser.service';
import { TableData } from 'src/app/models/table.data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public static readonly FIRST_COLLECTION: string = 'a';
  public static readonly SECOND_COLLECTION: string = 'b';
  public resultCollectionAsJSON: string | null = null;

  private collections: { [index: string]: TableData; } = {};
  private primaryKeys: { [index: string]: string } = {};
  private operation: Operation | null = null;

  public constructor(
      private joinService: JoinService,
      private serviceService: ParserService
    ) {
  }

  public onCollectionASet($event: TableData): void {
    this.onCollectionSet(AppComponent.FIRST_COLLECTION, $event);
  }

  public onCollectionBSet($event: TableData): void {
    this.onCollectionSet(AppComponent.SECOND_COLLECTION, $event);
  }

  public onCollectionAPrimaryKeyColumnSet(columnName: string): void {
    this.onCollectionPrimaryKeyColumnSet(AppComponent.FIRST_COLLECTION, columnName);
  }

  public onCollectionBPrimaryKeyColumnSet(columnName: string): void {
    this.onCollectionPrimaryKeyColumnSet(AppComponent.SECOND_COLLECTION, columnName);
  }

  public onOperationChoose(operation: Operation): void {
    this.operation = operation;
    this.runCalculationIfPossible();
  }

  public areBothCollectionSet(): boolean {
    return this.isCollectionSet(AppComponent.FIRST_COLLECTION)
      && this.isCollectionSet(AppComponent.SECOND_COLLECTION)
      && this.isPrimaryKeySet(AppComponent.FIRST_COLLECTION)
      && this.isPrimaryKeySet(AppComponent.SECOND_COLLECTION);
  }

  private onCollectionPrimaryKeyColumnSet(collectionName: string, columnName: string): void {
    this.primaryKeys[collectionName] = columnName;
    this.runCalculationIfPossible();
  }

  private onCollectionSet(name: string, $event: TableData): void {
    this.collections[name] = $event;
    this.runCalculationIfPossible();
  }

  private isOperationSet(): boolean {
    return !!this.operation;
  }

  private runCalculationIfPossible(): void {
    if (this.isOperationSet() && this.areBothCollectionSet()) {
      this.runCalculation();
    }
  }

  private runCalculation(): void {
    try {
      let mixerFunction = null;

      switch (this.operation) {
        case Operation.InnerJoin:
          mixerFunction = this.joinService.innerJoin;
          break;

        case Operation.LeftJoin:
          mixerFunction = this.joinService.leftJoin;
          break;

        case Operation.RightJoin:
          mixerFunction = this.joinService.rightJoin;
          break;

        case Operation.FullOtherJoin:
          mixerFunction = this.joinService.fullOutherJoin;
          break;

        default:
          throw new Error(`Unknown option: ${this.operation}.`);
      }

      this.resultCollectionAsJSON = this.serviceService.fromObjectToJSON(
        mixerFunction(
          this.collections[AppComponent.FIRST_COLLECTION].data,
          this.collections[AppComponent.SECOND_COLLECTION].data,
          this.primaryKeys[AppComponent.FIRST_COLLECTION],
          this.primaryKeys[AppComponent.SECOND_COLLECTION]
        )
      );
    }
    catch (err) {
      this.resultCollectionAsJSON = null;
      throw err;
    }
  }

  private isCollectionSet(name: string): boolean {
    return this.collections.hasOwnProperty(name) && this.collections[name].data != null;
  }

  private isPrimaryKeySet(name: string): boolean {
    return this.primaryKeys.hasOwnProperty(name) && this.primaryKeys[name] != null;
  }
}
