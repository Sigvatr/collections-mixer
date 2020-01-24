import { Component, OnInit } from '@angular/core';
import { ColumnMetaData } from '../models/column-meta-data';

@Component({
  selector: 'app-collection-view-component',
  templateUrl: './collection-view-component.component.html',
  styleUrls: ['./collection-view-component.component.scss']
})
export class CollectionViewComponentComponent implements OnInit {

  private rawJSON: string;
  private collectionData: any[]|null;
  private collectionMetaData: ColumnMetaData[];
  private message: string;

  constructor() {
  }

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
