import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendinglicenseComponent } from './pendinglicense.component';

describe('PendinglicenseComponent', () => {
  let component: PendinglicenseComponent;
  let fixture: ComponentFixture<PendinglicenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendinglicenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendinglicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
