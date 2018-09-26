import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifiedrecordsComponent } from './modifiedrecords.component';

describe('ModifiedrecordsComponent', () => {
  let component: ModifiedrecordsComponent;
  let fixture: ComponentFixture<ModifiedrecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifiedrecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifiedrecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
