import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllemployeeprofileComponent } from './allemployeeprofile.component';

describe('AllemployeeprofileComponent', () => {
  let component: AllemployeeprofileComponent;
  let fixture: ComponentFixture<AllemployeeprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllemployeeprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllemployeeprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
