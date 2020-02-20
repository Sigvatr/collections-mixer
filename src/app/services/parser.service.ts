import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParserService {
  constructor() { }

  fromJSONToObject(input: string): any[] {
    return JSON.parse(input);
  }

  fromObjectToJSON(input: any[]): string {
    return JSON.stringify(input, null, 4);
  }

  findAllColumns(collection: any[]): Set<string> {
    return collection.reduce(
        (set: Set<string>, row: any[]) => Object.keys(row).reduce(
          (setForRow: Set<string>, element: any) => setForRow.add(element),
          set
        ),
        new Set()
      );
  }

  fromObjectToCSV(collection: any[]): string {
    const columns = Array.from(this.findAllColumns(collection));

    return [columns.join(',')].concat(
        collection
          .map(
              line => columns.map(c => (line[c] || '')).join(',')
            )
      ).join('\n');
  }
}
