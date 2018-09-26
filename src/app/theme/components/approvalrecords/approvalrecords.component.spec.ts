import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalrecordsComponent } from './approvalrecords.component';

describe('ApprovalrecordsComponent', () => {
  let component: ApprovalrecordsComponent;
  let fixture: ComponentFixture<ApprovalrecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovalrecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalrecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
