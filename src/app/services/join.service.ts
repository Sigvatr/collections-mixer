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

  public rightJoin(firstCollection: any[], secondCollection: any[], firstColumn: string, secondColumn: string) {
    const firstCollectionKeyMap = JoinService.collectionToDict(firstCollection, firstColumn);

    return secondCollection
      .map(e => ({ ...e, ...firstCollectionKeyMap[e[secondColumn]] }))
  }

  public fullOutherJoin(firstCollection: any[], secondCollection: any[], firstColumn: string, secondColumn: string) {
    const firstCollectionKeyMap = JoinService.collectionToDict(firstCollection, firstColumn);
    const secondCollectionKeyMap = JoinService.collectionToDict(secondCollection, secondColumn);

    return firstCollection
      .map(e => ({ ...e, ...secondCollectionKeyMap[e[firstColumn]]}))
      .concat(
        secondCollection
          .filter(e => !firstCollectionKeyMap.hasOwnProperty(e[secondColumn]))
      )
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
