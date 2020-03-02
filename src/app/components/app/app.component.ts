import { Component } from '@angular/core';
import { JoinService } from '../../services/join.service';
import { OperationMetadata } from '../../models/operation-metadata';
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

  private collections: { [index: string]: TableData; } = {};
  private resultCollectionAsJSON: string | null = null;

  public constructor(
      private joinService: JoinService,
      private serviceService: ParserService
    ) {
  }

  collectionASet($event: TableData) {
    return this.collectionSet(AppComponent.FIRST_COLLECTION, $event);
  }

  collectionBSet($event: TableData) {
    return this.collectionSet(AppComponent.SECOND_COLLECTION, $event);
  }

  aCollectionColumns(): string[] {
    return this.collections[AppComponent.FIRST_COLLECTION].columns;
  }

  bCollectionColumns(): string[] {
    return this.collections[AppComponent.SECOND_COLLECTION].columns;
  }

  collectionAPrimaryKeyColumnSet(columnName: string): void {
    console.log('A', columnName);
  }

  collectionBPrimaryKeyColumnSet(columnName: string): void {
    console.log('B', columnName);
  }

  areBothCollectionSet() {
    return this.isCollectionSet(AppComponent.FIRST_COLLECTION) && this.isCollectionSet(AppComponent.SECOND_COLLECTION);
  }

  onOperationChoose($event: OperationMetadata) {
    try {
      let mixerFunction = null;
      switch (+$event.operation) {
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
          throw new Error(`Unknown option: ${$event.operation}.`);
      }

      this.resultCollectionAsJSON = this.serviceService.fromObjectToJSON(
        mixerFunction(
          this.collections[AppComponent.FIRST_COLLECTION].data,
          this.collections[AppComponent.SECOND_COLLECTION].data,
          $event.firstColumn,
          $event.secondColumn
        )
      );
    }
    catch (err) {
      this.resultCollectionAsJSON = null;
      throw err;
    }
  }

  private isCollectionSet(name: string) {
    return this.collections.hasOwnProperty(name)
      && this.collections[name].data != null;
  }

  private collectionSet(name: string, $event: TableData) {
    this.collections[name] = $event;
    this.resultCollectionAsJSON = null;
  }
}
