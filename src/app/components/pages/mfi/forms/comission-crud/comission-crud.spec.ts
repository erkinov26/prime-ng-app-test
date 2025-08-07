import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComissionCrud } from './comission-crud';

describe('ComissionCrud', () => {
  let component: ComissionCrud;
  let fixture: ComponentFixture<ComissionCrud>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComissionCrud]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComissionCrud);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
