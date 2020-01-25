import { Component, OnInit, Input } from '@angular/core';
import { ColumnMetaData } from '../models/column-meta-data';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input()
  private data: any[];

  private metaData: ColumnMetaData[];
  
  constructor() { }

  ngOnInit() {
    this.metaData = Object.keys(this.data[0]).map(key => ({ name: key, type: 'string' }));
  }
}
