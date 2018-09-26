import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderaccessrequestComponent } from './folderaccessrequest.component';

describe('FolderaccessrequestComponent', () => {
  let component: FolderaccessrequestComponent;
  let fixture: ComponentFixture<FolderaccessrequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FolderaccessrequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FolderaccessrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
