import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxJs } from './rx-js';

describe('RxJs', () => {
  let component: RxJs;
  let fixture: ComponentFixture<RxJs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RxJs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RxJs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
