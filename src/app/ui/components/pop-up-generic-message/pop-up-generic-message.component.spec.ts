import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpGenericMessageComponent } from './pop-up-generic-message.component';

describe('PopUpGenericMessageComponent', () => {
  let component: PopUpGenericMessageComponent;
  let fixture: ComponentFixture<PopUpGenericMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpGenericMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpGenericMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
