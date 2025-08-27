import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThrottleTime } from './throttle-time';

describe('ThrottleTime', () => {
  let component: ThrottleTime;
  let fixture: ComponentFixture<ThrottleTime>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThrottleTime]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThrottleTime);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
