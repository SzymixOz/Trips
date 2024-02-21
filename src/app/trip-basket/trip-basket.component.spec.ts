import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripBasketComponent } from './trip-basket.component';

describe('TripBasketComponent', () => {
  let component: TripBasketComponent;
  let fixture: ComponentFixture<TripBasketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripBasketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripBasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
