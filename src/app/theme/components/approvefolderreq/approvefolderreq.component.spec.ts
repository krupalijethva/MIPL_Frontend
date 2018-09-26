import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovefolderreqComponent } from './approvefolderreq.component';

describe('ApprovefolderreqComponent', () => {
  let component: ApprovefolderreqComponent;
  let fixture: ComponentFixture<ApprovefolderreqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovefolderreqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovefolderreqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
