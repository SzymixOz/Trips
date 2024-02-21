import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenagerDashboardComponent } from './menager-dashboard.component';

describe('MenagerDashboardComponent', () => {
  let component: MenagerDashboardComponent;
  let fixture: ComponentFixture<MenagerDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenagerDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenagerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
