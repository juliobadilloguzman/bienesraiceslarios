import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarTerrenoViewComponent } from './agregar-terreno-view.component';

describe('AgregarTerrenoViewComponent', () => {
  let component: AgregarTerrenoViewComponent;
  let fixture: ComponentFixture<AgregarTerrenoViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarTerrenoViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarTerrenoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
