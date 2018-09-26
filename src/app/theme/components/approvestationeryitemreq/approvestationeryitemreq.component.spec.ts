import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovestationeryitemreqComponent } from './approvestationeryitemreq.component';

describe('ApprovestationeryitemreqComponent', () => {
  let component: ApprovestationeryitemreqComponent;
  let fixture: ComponentFixture<ApprovestationeryitemreqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovestationeryitemreqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovestationeryitemreqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
