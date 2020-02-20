import { TestBed } from '@angular/core/testing';

import { ParserService } from './parser.service';

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
    const testCollection = [
      { 'a': 1, 'b': 2 },
      { 'a': 3, 'b': 4, 'c': 5 },
      { 'a': 6, 'b': 7, 'd': 8 },
      { 'b': 9, 'd': 10 },
    ];
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
});
