import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstExample } from './first-example';

describe('FirstExample', () => {
  let component: FirstExample;
  let fixture: ComponentFixture<FirstExample>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirstExample]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstExample);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
