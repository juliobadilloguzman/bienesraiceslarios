import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradoresViewComponent } from './administradores-view.component';

describe('AdministradoresViewComponent', () => {
  let component: AdministradoresViewComponent;
  let fixture: ComponentFixture<AdministradoresViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministradoresViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradoresViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
