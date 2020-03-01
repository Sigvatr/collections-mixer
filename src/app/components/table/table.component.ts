import { Component, Input } from '@angular/core';
import { TableData } from 'src/app/models/table.data';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  @Input() data: TableData;
  private primaryKeyColumn: string;

  constructor() { }

  setAsPrimaryKey(column): void {
    this.primaryKeyColumn = column;
  }

  sortBy(column: string, sortOrder: number): (a: any, b: any) => number {
    return (a: any, b: any) => (a[column] < b[column]) ? (-1 * sortOrder) : (a[column] > b[column]) ? sortOrder : 0;
  }

  sortByColumn(column: string): void {
    const sortOrder =
      (this.data.order && this.data.order.column == column)
        ? (this.data.order.asc ? -1 : 1)
        : 1;

    this.data.data.sort(this.sortBy(column, sortOrder));
    this.data.order = {
      column: column,
      asc: sortOrder == 1
    };
  }
}
