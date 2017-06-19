import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationPreviewComponent } from './reservation-preview.component';

describe('ReservationPreviewComponent', () => {
  let component: ReservationPreviewComponent;
  let fixture: ComponentFixture<ReservationPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
