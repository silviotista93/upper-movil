import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymetPage } from './paymet.page';

describe('PaymetPage', () => {
  let component: PaymetPage;
  let fixture: ComponentFixture<PaymetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymetPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
