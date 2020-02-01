import { Injectable } from '@angular/core';
import { ColumnMetaData } from '../models/column-meta-data';

@Injectable({
  providedIn: 'root'
})
export class JoinService {

  public innerJoin(firstCollection: any[], secondCollection: any[], firstColumn: ColumnMetaData, secondColumn: ColumnMetaData) {
    throw new Error("Method not implemented.");
  }

  constructor() { }
}
