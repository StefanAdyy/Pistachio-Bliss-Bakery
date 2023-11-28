import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayButtonComponent } from './pay-button.component';

describe('PayButtonComponent', () => {
  let component: PayButtonComponent;
  let fixture: ComponentFixture<PayButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PayButtonComponent]
    });
    fixture = TestBed.createComponent(PayButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
