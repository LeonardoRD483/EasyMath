import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemProblemComponent } from './item-problem.component';

describe('ItemProblemComponent', () => {
  let component: ItemProblemComponent;
  let fixture: ComponentFixture<ItemProblemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemProblemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemProblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
