import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestResource } from './request-resource';

describe('RequestResource', () => {
  let component: RequestResource;
  let fixture: ComponentFixture<RequestResource>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestResource]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestResource);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
