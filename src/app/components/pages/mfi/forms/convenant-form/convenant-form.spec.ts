import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvenantForm } from './convenant-form';

describe('ConvenantForm', () => {
  let component: ConvenantForm;
  let fixture: ComponentFixture<ConvenantForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConvenantForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConvenantForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
