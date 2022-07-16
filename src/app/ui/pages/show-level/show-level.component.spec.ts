import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowLevelComponent } from './show-level.component';

describe('ShowLevelComponent', () => {
  let component: ShowLevelComponent;
  let fixture: ComponentFixture<ShowLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowLevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
