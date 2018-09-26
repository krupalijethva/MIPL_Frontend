import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PunchingrecordsComponent } from './punchingrecords.component';

describe('PunchingrecordsComponent', () => {
  let component: PunchingrecordsComponent;
  let fixture: ComponentFixture<PunchingrecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PunchingrecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PunchingrecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
