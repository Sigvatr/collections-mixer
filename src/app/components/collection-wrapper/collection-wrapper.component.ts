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
  private message: string;
  private mode: string;

  @Input() rawJSON: string = null;
  @Input() collection: TableData;
  @Output() collectionSet: EventEmitter<TableData> = new EventEmitter<TableData>();

  constructor(
    private parserService: ParserService
  ) {
    this.mode = 'edit';
  }

  ngOnInit() {
    if (this.rawJSON) {
      this.onParseCollectionClick();
    }
  }

  onParseCollectionClick() {
    try {
      const parsedData = this.parserService.fromJSONToObject(this.rawJSON);
      if (!isArray(parsedData)) {
        throw new Error('Provided data are not array');
      }

      this.collection = {
        data: parsedData,
        columns: this.parserService.findAllColumns(parsedData),
        order: null
      };

      this.mode = 'table';
      this.collectionSet.emit(this.collection);
    }
    catch (exception) {
      this.message = exception.message;
      this.mode = 'edit';
    }
  }

  editData() {
    this.rawJSON = this.parserService.fromObjectToJSON(this.collection.data);
    this.collection = null;
    this.mode = 'edit';
  }

  showAsCSV() {
    this.mode = 'csv';
  }

  closeCSVView() {
    this.mode = 'table';
  }

  csv() {
    return JSON.stringify(this.collection);
  }
}
