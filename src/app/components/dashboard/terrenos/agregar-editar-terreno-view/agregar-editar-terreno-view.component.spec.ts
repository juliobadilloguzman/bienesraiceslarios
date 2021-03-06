import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarTerrenoViewComponent } from './agregar-editar-terreno-view.component';

describe('AgregarEditarTerrenoViewComponent', () => {
  let component: AgregarEditarTerrenoViewComponent;
  let fixture: ComponentFixture<AgregarEditarTerrenoViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarEditarTerrenoViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarEditarTerrenoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
