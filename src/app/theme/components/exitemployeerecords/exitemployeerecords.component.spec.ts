import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitemployeerecordsComponent } from './exitemployeerecords.component';

describe('ExitemployeerecordsComponent', () => {
  let component: ExitemployeerecordsComponent;
  let fixture: ComponentFixture<ExitemployeerecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExitemployeerecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExitemployeerecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
