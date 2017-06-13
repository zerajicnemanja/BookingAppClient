import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogcountryComponent } from './dialogcountry.component';

describe('DialogcountryComponent', () => {
  let component: DialogcountryComponent;
  let fixture: ComponentFixture<DialogcountryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogcountryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogcountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
