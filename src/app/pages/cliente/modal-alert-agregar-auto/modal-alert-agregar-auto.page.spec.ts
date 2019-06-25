import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAlertAgregarAutoPage } from './modal-alert-agregar-auto.page';

describe('ModalAlertAgregarAutoPage', () => {
  let component: ModalAlertAgregarAutoPage;
  let fixture: ComponentFixture<ModalAlertAgregarAutoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAlertAgregarAutoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAlertAgregarAutoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
