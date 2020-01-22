import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionViewComponentComponent } from './collection-view-component.component';

describe('CollectionViewComponentComponent', () => {
  let component: CollectionViewComponentComponent;
  let fixture: ComponentFixture<CollectionViewComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionViewComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionViewComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
