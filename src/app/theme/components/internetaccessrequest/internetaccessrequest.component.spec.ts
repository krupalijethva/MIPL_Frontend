import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternetaccessrequestComponent } from './internetaccessrequest.component';

describe('InternetaccessrequestComponent', () => {
  let component: InternetaccessrequestComponent;
  let fixture: ComponentFixture<InternetaccessrequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternetaccessrequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternetaccessrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
