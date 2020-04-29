import { TestBed } from '@angular/core/testing';

import { ParserService } from './parser.service';
import { TableData } from '../models/table.data';

describe('ParserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ParserService = TestBed.get(ParserService);
    expect(service).toBeTruthy();
  });

  it('should find all columns', () => {
    // Assign
    const service: ParserService = TestBed.get(ParserService);
    const testCollection = [
      { 'a': 1, 'b': 2 },
      { 'a': 3, 'b': 4, 'c': 5 },
      { 'a': 6, 'b': 7, 'd': 8 },
      { 'b': 9, 'd': 10 },
    ];
    const expected = new Set(['a', 'b', 'c', 'd']);

    // Act
    const result = service.findAllColumns(testCollection)

    // Assert
    expect(expected).toEqual(result);
  });

  it('should convert data set (without strings) into CSV', () => {
    // Assign
    const service: ParserService = TestBed.get(ParserService);
    const testCollection: TableData = {
      data: [
        { 'a': 1, 'b': 2 },
        { 'a': 3, 'b': 4, 'c': 5 },
        { 'a': 6, 'b': 7, 'd': 8 },
        { 'b': 9, 'd': 10 },
      ],
      columns: ['a', 'b', 'c', 'd'],
      order: null
    };
    const expected = `a,b,c,d
1,2,,
3,4,5,
6,7,,8
,9,,10`;

    // Act
    const result = service.fromObjectToCSV(testCollection);

    // Assert
    expect(expected).toEqual(result);
  });

  it('should convert data set (with strings, with commas) into CSV', () => {
    // Assign
    const service: ParserService = TestBed.get(ParserService);
    const testCollection: TableData = {
      data: [
        { 'a': 1, 'b': 'simple string' },
        { 'a': 'Not so "simple" string', 'b': 4, 'c': 5 },
        { 'a': 6, 'b': 7, 'd': 'Also, not so simple string' },
        { 'b': 9, 'd': 10 },
      ],
      columns: ['a', 'b', 'c', 'd'],
      order: null
    };
    const expected = `a,b,c,d
1,simple string,,
"Not so ""simple"" string",4,5,
6,7,,"Also, not so simple string"
,9,,10`;

    // Act
    const result = service.fromObjectToCSV(testCollection);

    // Assert
    expect(expected).toEqual(result);
  });

  it('should convert data including "false" value into CSV', () => {
    // Assign
    const service: ParserService = TestBed.get(ParserService);
    const testCollection: TableData = {
      data: [
        { 'a': 'A', 'b': false, 'c': 'C' },
        { 'a': false, 'b': false, 'c': false },
        { 'a': 'A', 'b': true, 'c': true },

      ],
      columns: ['a', 'b', 'c'],
      order: null
    };

    const expected = `a,b,c
A,false,C
false,false,false
A,true,true`;

    // Act
    const result = service.fromObjectToCSV(testCollection);

    // Assert
    expect(expected).toEqual(result);
  });

});
