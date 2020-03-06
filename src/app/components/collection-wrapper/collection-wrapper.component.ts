import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { isArray } from 'util';
import { ParserService } from '../../services/parser.service';
import { TableData } from 'src/app/models/table.data';

@Component({
  selector: 'app-collection-wrapper',
  templateUrl: './collection-wrapper.component.html',
  styleUrls: ['./collection-wrapper.component.scss']
})
export class CollectionWrapperComponent implements OnInit {
  public message: string;
  public mode: string;
  private _rawJSON: string = null;

  @Input()
  public set rawJSON(value: string) {
    this.collection = null;
    this._rawJSON = value;
    if (this._rawJSON) {
      this.collection = this.buildCollection(this._rawJSON);
    }
  }

  public get rawJSON() {
    return this._rawJSON;
  }

  @Input() public collection: TableData;
  @Input() public readonly: boolean = false;
  @Output() public collectionSet: EventEmitter<TableData> = new EventEmitter<TableData>();
  @Output() public primaryKeyColumnSet: EventEmitter<string> = new EventEmitter<string>();

  public constructor(private parserService: ParserService) {
  }

  public ngOnInit() {
    this.mode = this.rawJSON ? 'table' : 'edit';
  }

  public onParseCollectionClick() {
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

  public editData() {
    this._rawJSON = this.parserService.fromObjectToJSON(this.collection.data);
    this.mode = 'edit';
  }

  public showAsCSV() {
    this.mode = 'csv';
  }

  public closeCSVView() {
    this.mode = 'table';
  }

  public csv() {
    return this.parserService.fromObjectToCSV(this.collection);
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
}
