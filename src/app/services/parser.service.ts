import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParserService {
  constructor() { }

  fromStringToObject(input: string): any[] {
    return JSON.parse(input);
  }

  fromObjectToString(input: any[]): string {
    return JSON.stringify(input, null, 4);
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
