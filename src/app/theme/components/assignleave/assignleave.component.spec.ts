import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignleaveComponent } from './assignleave.component';

describe('AssignleaveComponent', () => {
  let component: AssignleaveComponent;
  let fixture: ComponentFixture<AssignleaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignleaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignleaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
