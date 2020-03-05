import { Component, OnInit, Output, Input, EventEmitter, SimpleChanges } from '@angular/core';
import { isArray } from 'util';
import { ParserService } from '../../services/parser.service';
import { TableData } from 'src/app/models/table.data';


@Component({
  selector: 'app-collection-wrapper',
  templateUrl: './collection-wrapper.component.html',
  styleUrls: ['./collection-wrapper.component.scss']
})
export class CollectionWrapperComponent implements OnInit {
  private message: string;
  private mode: string;
  private _rawJSON: string = null;


  @Input() set rawJSON(value: string) {
    this.collection = null;
    this._rawJSON = value;
    if (this._rawJSON) {
      this.collection = this.buildCollection(this._rawJSON);
    }
  }

  get rawJSON() {
    return this._rawJSON;
  }

  @Input() collection: TableData;
  @Input() readonly: boolean = false;
  @Output() collectionSet: EventEmitter<TableData> = new EventEmitter<TableData>();
  @Output() primaryKeyColumnSet: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private parserService: ParserService
  ) {
  }

  ngOnInit() {
    this.mode = this.rawJSON ? 'table' : 'edit';
  }

  private buildCollection(rawJSON: string): TableData {
    const parsedData = this.parserService.fromJSONToObject(rawJSON);
    if (!isArray(parsedData)) {
      throw new Error('Provided data are not array');
    }

    return {
      data: parsedData,
      columns: Array.from(this.parserService.findAllColumns(parsedData)),
      order: null
    };
  }

  onParseCollectionClick() {
    this.message = null;
    try {
      this.collection = this.buildCollection(this.rawJSON);
      this.mode = 'table';
      this.collectionSet.emit(this.collection);
    }
    catch (exception) {
      this.message = exception.message;
      this.mode = 'edit';
    }
  }

  editData() {
    this._rawJSON = this.parserService.fromObjectToJSON(this.collection.data);
    this.mode = 'edit';
  }

  showAsCSV() {
    this.mode = 'csv';
  }

  closeCSVView() {
    this.mode = 'table';
  }

  csv() {
    return this.parserService.fromObjectToCSV(this.collection);
  }
}
