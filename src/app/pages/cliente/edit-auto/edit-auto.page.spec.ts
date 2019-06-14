import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAutoPage } from './edit-auto.page';

describe('EditAutoPage', () => {
  let component: EditAutoPage;
  let fixture: ComponentFixture<EditAutoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAutoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAutoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
