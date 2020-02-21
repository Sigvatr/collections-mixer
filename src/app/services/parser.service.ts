import { Injectable } from '@angular/core';
import { TableData } from '../models/table.data';

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

  fromObjectToCSV(collection: TableData): string {
    return [collection.columns.join(',')].concat(
        collection.data
          .map(
              line => collection.columns.map(c => (line[c] || '')).join(',')
            )
      ).join('\n');
  }
}
