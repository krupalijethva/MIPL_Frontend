import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllprofilesComponent } from './allprofiles.component';

describe('AllprofilesComponent', () => {
  let component: AllprofilesComponent;
  let fixture: ComponentFixture<AllprofilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllprofilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllprofilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
