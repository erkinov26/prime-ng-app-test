import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Commitment } from './commitment';

describe('Commitment', () => {
  let component: Commitment;
  let fixture: ComponentFixture<Commitment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Commitment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Commitment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
