import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmAgregarTerrenoModalComponent } from './confirm-agregar-terreno-modal.component';

describe('ConfirmAgregarTerrenoModalComponent', () => {
  let component: ConfirmAgregarTerrenoModalComponent;
  let fixture: ComponentFixture<ConfirmAgregarTerrenoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmAgregarTerrenoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmAgregarTerrenoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
