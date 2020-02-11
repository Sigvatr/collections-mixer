import { Component } from '@angular/core';
import { JoinService } from '../../services/join.service';
import { OperationMetadata } from '../../models/operation-metadata';
import { Operation } from '../../models/operation.enum';
import { ParserService } from '../../services/parser.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public static readonly FIRST_COLLECTION: string = 'a';
  public static readonly SECOND_COLLECTION: string = 'b';

  private collections: { [index: string]: TableData; } = {};
  private resultCollection: any[];

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

  resultAsJSON() {
    return this.serviceService.fromObjectToString(this.resultCollection);
  }

  areBothCollectionSet() {
    return this.isCollectionSet(AppComponent.FIRST_COLLECTION) && this.isCollectionSet(AppComponent.SECOND_COLLECTION);
  }

  onOperationChoose($event: OperationMetadata) {

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

    this.resultCollection = mixerFunction(
      this.collections[AppComponent.FIRST_COLLECTION].data,
      this.collections[AppComponent.SECOND_COLLECTION].data,
      $event.firstColumn,
      $event.secondColumn
    );
  }

  private isCollectionSet(name: string) {
    return this.collections.hasOwnProperty(name)
      && this.collections[name].data != null;
  }

  private collectionSet(name: string, $event: TableData) {
    this.collections[name] = $event;
    this.resultCollection = null;
  }
}
