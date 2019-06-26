import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSubscripcionesPage } from './list-subscripciones.page';

describe('ListSubscripcionesPage', () => {
  let component: ListSubscripcionesPage;
  let fixture: ComponentFixture<ListSubscripcionesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSubscripcionesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSubscripcionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
