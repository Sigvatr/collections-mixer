import { Component, OnInit, Output, Input } from '@angular/core';
import { ColumnMetaData } from '../models/column-meta-data';
import { EventEmitter } from '@angular/core';


@Component({
  selector: 'app-collection-wrapper',
  templateUrl: './collection-wrapper.component.html',
  styleUrls: ['./collection-wrapper.component.scss']
})
export class CollectionWrapperComponent implements OnInit {
  private message: string;
  private rawJSON: string;
  private collectionData: any[]|null;
  private collectionMetaData: ColumnMetaData[];

  @Input() name: string = null;
  @Output() collectionSet: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onParseCollectionClick() {
    try
    {
      this.collectionData = JSON.parse(this.rawJSON);
      this.collectionMetaData = Object.keys(this.collectionData[0])
          .map(key => ({ name: key, type: 'string' }));

      this.collectionSet.emit({
            name: this.name,
            data: this.collectionData,
            metadata: this.collectionMetaData
        });
    }
    catch(exception)
    {
      this.message = exception.message;
    }
  }

  editData() {
    this.collectionData = null;
    this.collectionMetaData = null;
    this.message = null;
  }
}
