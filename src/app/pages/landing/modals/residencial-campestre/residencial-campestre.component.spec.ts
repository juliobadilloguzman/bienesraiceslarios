import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidencialCampestreComponent } from './residencial-campestre.component';

describe('ResidencialCampestreComponent', () => {
  let component: ResidencialCampestreComponent;
  let fixture: ComponentFixture<ResidencialCampestreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResidencialCampestreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidencialCampestreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
