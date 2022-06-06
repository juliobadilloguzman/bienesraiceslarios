import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MensualidadesViewComponent } from './mensualidades-view.component';

describe('MensualidadesViewComponent', () => {
  let component: MensualidadesViewComponent;
  let fixture: ComponentFixture<MensualidadesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MensualidadesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MensualidadesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
