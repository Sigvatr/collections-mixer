import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class JoinService {

  public innerJoin(firstCollection: any[], secondCollection: any[], firstColumn: string, secondColumn: string) {
    const secondCollectionKeyMap = JoinService.collectionToDict(secondCollection, secondColumn);

    return firstCollection
      .filter(e => secondCollectionKeyMap.hasOwnProperty(e[firstColumn]))
      .map(e => ({ ...e, ...secondCollectionKeyMap[e[firstColumn]] }))
  }

  public leftJoin(firstCollection: any[], secondCollection: any[], firstColumn: string, secondColumn: string) {
    const secondCollectionKeyMap = JoinService.collectionToDict(secondCollection, secondColumn);

    return firstCollection
      .map(e => ({ ...e, ...secondCollectionKeyMap[e[firstColumn]] }))
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
