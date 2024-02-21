import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripModifyComponent } from './trip-modify.component';

describe('TripModifyComponent', () => {
  let component: TripModifyComponent;
  let fixture: ComponentFixture<TripModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripModifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
