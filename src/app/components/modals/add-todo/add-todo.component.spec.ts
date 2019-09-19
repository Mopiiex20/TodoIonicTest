import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTODOModal } from './add-todo.component';

describe('AddTODOComponent', () => {
  let component: AddTODOModal;
  let fixture: ComponentFixture<AddTODOModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTODOModal ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTODOModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
