import { TestBed } from '@angular/core/testing';
import { JoinService } from './join.service';


describe('JoinService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should calculate inner join', () => {
    // Assign
    const service: JoinService = TestBed.get(JoinService);

    const collectionA = [
      { name: 'potatoes', price: 3 },
      { name: 'avocados', price: 4 },
      { name: 'kiwis', price: 2 },
      { name: 'onions', price: 1 },
      { name: 'melons', price: 5 },
      { name: 'oranges', price: 5 },
      { name: 'tomatoes', price: 6 }
    ];

    const collectionB = [
      { quantity: 23, name: 'potatoes' },
      { quantity: 62, name: 'avocados' },
      { quantity: 30, name: 'kiwis' },
      { quantity: 34, name: 'onions' },
      { quantity: 21, name: 'melons' },
      { quantity: 35, name: 'broccoli' },
      { quantity: 23, name: 'squash' }
    ];

    const expectResult = [
      { name: 'potatoes', price: 3, quantity: 23 },
      { name: 'avocados', price: 4, quantity: 62 },
      { name: 'kiwis', price: 2, quantity: 30 },
      { name: 'onions', price: 1, quantity: 34 },
      { name: 'melons', price: 5, quantity: 21 }
    ];

    // Act
    const result = service.innerJoin(
      collectionA,
      collectionB,
      { name: 'name', type: 'string' },
      { name: 'name', type: 'string' }
    );

    // Assert
    expect(JSON.stringify(result))
      .toEqual(JSON.stringify(expectResult));
  });
});
