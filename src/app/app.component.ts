import { Component } from '@angular/core';
import { JoinService } from './services/join.service';
import { OperationMetadata } from './models/operation-metadata';
import { Operation } from './models/operation.enum';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public static readonly FIRST_COLLECTION: string = 'a';
  public static readonly SECOND_COLLECTION: string = 'b';

  private collections: { [index: string]: any; } = {};

  public constructor(
      private joinService: JoinService
    ) {
  }

  private collectionSet($event) {
    this.collections[$event['name']] = {
      data: $event['data'],
      metadata: $event['metadata']
    };
  }

  private isCollectionSet(name: string) {
    return this.collections.hasOwnProperty(name) && this.collections[name].data != null;
  }

  areBothCollectionSet() {
    return this.isCollectionSet(AppComponent.FIRST_COLLECTION) && this.isCollectionSet(AppComponent.SECOND_COLLECTION);
  }

  onOperationChoose($event: OperationMetadata) {
    switch($event.operation) {
      case Operation.InnerJoin:
        this.joinService.innerJoin(
            this.collections[AppComponent.FIRST_COLLECTION],
            this.collections[AppComponent.SECOND_COLLECTION],
            $event.firstColumn,
            $event.secondColumn
          );
      default:
        throw new Error(`Unknown option: ${$event.operation}.`);
    }
  }
}
