import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TableData } from 'src/app/models/table.data';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  @Input() data: TableData;
  @Output() primaryKeyColumnSet: EventEmitter<string> = new EventEmitter<string>();

  private primaryKeyColumn: string;

  constructor() { }

  setAsPrimaryKey(column: string): void {
    this.primaryKeyColumn = column;
    this.primaryKeyColumnSet.emit(this.primaryKeyColumn);
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
