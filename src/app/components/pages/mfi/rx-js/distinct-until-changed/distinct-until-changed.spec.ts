import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistinctUntilChanged } from './distinct-until-changed';

describe('DistinctUntilChanged', () => {
  let component: DistinctUntilChanged;
  let fixture: ComponentFixture<DistinctUntilChanged>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistinctUntilChanged]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistinctUntilChanged);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
