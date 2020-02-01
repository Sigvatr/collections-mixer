import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ColumnMetaData } from '../models/column-meta-data';


@Component({
  selector: 'app-choose-column',
  templateUrl: './choose-column.component.html',
  styleUrls: ['./choose-column.component.scss']
})
export class ChooseColumnComponent implements OnInit {

  @Input() selectedColumn: ColumnMetaData;
  @Input() columns: ColumnMetaData[];
  @Output() selectedColumnChange = new EventEmitter<ColumnMetaData>();

  constructor() { }

  ngOnInit() {
  }

}
