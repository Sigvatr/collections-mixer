import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParserService {

  constructor() { }

  fromStringParse(input: string) {
    return JSON.parse(input);
  }

  findAllColumns(collection: any[]) {
    return collection.reduce(
        (set: Set<any>, row: any[]) => Object.keys(row).reduce(
          (setForRow: Set<any>, element: any) => setForRow.add(element),
          set
        ),
        new Set()
      );
  }
}
