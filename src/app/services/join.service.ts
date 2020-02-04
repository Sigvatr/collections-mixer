import { Injectable } from '@angular/core';
import { ColumnMetaData } from '../models/column-meta-data';

@Injectable({
  providedIn: 'root'
})
export class JoinService {

  public innerJoin(firstCollection: any[], secondCollection: any[], firstColumn: ColumnMetaData, secondColumn: ColumnMetaData) {
    const secondCollectionKeyMap = JoinService.collectionToDict(secondCollection, secondColumn.name);

    return firstCollection
      .filter(e => secondCollectionKeyMap.hasOwnProperty(e[firstColumn.name]))
      .map(e => ({ ...e, ...secondCollectionKeyMap[e[firstColumn.name]] }))
  }

  public leftJoin(firstCollection: any[], secondCollection: any[], firstColumn: ColumnMetaData, secondColumn: ColumnMetaData) {
    const secondCollectionKeyMap = JoinService.collectionToDict(secondCollection, secondColumn.name);

    return firstCollection
      .map(e => ({ ...e, ...secondCollectionKeyMap[e[firstColumn.name]] }))
  }

  constructor() { }

  private static collectionToDict(collection: any[], column: string) {
    return collection.reduce(
        (obj, e) => {
          obj[e[column]] = e;
          return obj;
        },
        {}
      );
  }
}
