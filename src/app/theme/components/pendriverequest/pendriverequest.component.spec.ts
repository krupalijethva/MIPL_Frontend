import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendriverequestComponent } from './pendriverequest.component';

describe('PendriverequestComponent', () => {
  let component: PendriverequestComponent;
  let fixture: ComponentFixture<PendriverequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendriverequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendriverequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
