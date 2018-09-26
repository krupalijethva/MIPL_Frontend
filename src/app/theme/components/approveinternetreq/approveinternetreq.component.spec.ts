import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveinternetreqComponent } from './approveinternetreq.component';

describe('ApproveinternetreqComponent', () => {
  let component: ApproveinternetreqComponent;
  let fixture: ComponentFixture<ApproveinternetreqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveinternetreqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveinternetreqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
