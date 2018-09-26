import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestlicenseComponent } from './requestlicense.component';

describe('RequestlicenseComponent', () => {
  let component: RequestlicenseComponent;
  let fixture: ComponentFixture<RequestlicenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestlicenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestlicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
