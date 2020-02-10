import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { isArray } from 'util';
import { ParserService } from '../../services/parser.service';


@Component({
  selector: 'app-collection-wrapper',
  templateUrl: './collection-wrapper.component.html',
  styleUrls: ['./collection-wrapper.component.scss']
})
export class CollectionWrapperComponent implements OnInit {
  private message: string;

  @Input() rawJSON: string = null;
  @Input() collection: TableData;
  @Output() collectionSet: EventEmitter<TableData> = new EventEmitter<TableData>();

  constructor(
      private parserService: ParserService
    ) {
  }

  ngOnInit() {
    if (this.rawJSON) {
      this.onParseCollectionClick();
    }
  }

  onParseCollectionClick() {
    try
    {
      const parsedData = this.parserService.fromStringToObject(this.rawJSON);
      if (!isArray(parsedData)) {
        throw new Error('Provided data are not array');
      }

      this.collection = {
          data: parsedData,
          columns: this.parserService.findAllColumns(parsedData)
        };

      this.collectionSet.emit(this.collection);
    }
    catch(exception)
    {
      this.message = exception.message;
    }
  }

  editData() {
    this.rawJSON = this.parserService.fromObjectToString(this.collection.data);
    this.collection = null;
  }
}
