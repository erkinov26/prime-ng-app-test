import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForkJoin } from './fork-join';

describe('ForkJoin', () => {
  let component: ForkJoin;
  let fixture: ComponentFixture<ForkJoin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForkJoin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForkJoin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
