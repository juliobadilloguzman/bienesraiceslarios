import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateMensualidadModalComponent } from './create-update-mensualidad-modal.component';

describe('CreateUpdateMensualidadModalComponent', () => {
  let component: CreateUpdateMensualidadModalComponent;
  let fixture: ComponentFixture<CreateUpdateMensualidadModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUpdateMensualidadModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateMensualidadModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
