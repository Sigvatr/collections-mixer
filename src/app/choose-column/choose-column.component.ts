import { Component, OnInit, Inject, Input } from '@angular/core';
import { ColumnMetaData } from '../models/column-meta-data';

@Component({
  selector: 'app-choose-column',
  templateUrl: './choose-column.component.html',
  styleUrls: ['./choose-column.component.scss']
})
export class ChooseColumnComponent implements OnInit {

  @Input()
  private columns: ColumnMetaData[];

  constructor() { }

  ngOnInit() {
  }

}
