import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondExample } from './second-example';

describe('SecondExample', () => {
  let component: SecondExample;
  let fixture: ComponentFixture<SecondExample>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecondExample]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecondExample);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
