import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionWrapperComponent } from './collection-wrapper.component';

describe('CollectionWrapperComponent', () => {
  let component: CollectionWrapperComponent;
  let fixture: ComponentFixture<CollectionWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
