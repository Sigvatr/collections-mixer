import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public static readonly FIRST_COLLECTION: string = 'a';
  public static readonly SECOND_COLLECTION: string = 'b';

  private collections: { [index: string]: any; } = {};

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

  onOperationChoose($event) {
    console.log($event);
  }
}
