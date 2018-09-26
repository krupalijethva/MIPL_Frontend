import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovependrivereqComponent } from './approvependrivereq.component';

describe('ApprovependrivereqComponent', () => {
  let component: ApprovependrivereqComponent;
  let fixture: ComponentFixture<ApprovependrivereqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovependrivereqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovependrivereqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
