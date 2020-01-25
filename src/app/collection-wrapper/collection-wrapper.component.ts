import { Component, OnInit } from '@angular/core';
import { ColumnMetaData } from '../models/column-meta-data';


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

  constructor() { }

  ngOnInit() {
  }

  onParseCollectionClick() {
    try
    {
      this.collectionData = JSON.parse(this.rawJSON);
      this.collectionMetaData = Object.keys(this.collectionData[0])
          .map(key => ({ name: key, type: 'string' }));
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
