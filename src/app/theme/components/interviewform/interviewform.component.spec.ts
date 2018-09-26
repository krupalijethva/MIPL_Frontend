import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewformComponent } from './interviewform.component';

describe('InterviewformComponent', () => {
  let component: InterviewformComponent;
  let fixture: ComponentFixture<InterviewformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterviewformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
