import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitformComponent } from './exitform.component';

describe('ExitformComponent', () => {
  let component: ExitformComponent;
  let fixture: ComponentFixture<ExitformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExitformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExitformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
