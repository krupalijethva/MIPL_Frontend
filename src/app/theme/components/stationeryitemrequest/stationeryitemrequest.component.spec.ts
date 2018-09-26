import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StationeryitemrequestComponent } from './stationeryitemrequest.component';

describe('StationeryitemrequestComponent', () => {
  let component: StationeryitemrequestComponent;
  let fixture: ComponentFixture<StationeryitemrequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StationeryitemrequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StationeryitemrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
