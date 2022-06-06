import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewMensualidadModalComponent } from './preview-mensualidad-modal.component';

describe('PreviewMensualidadModalComponent', () => {
  let component: PreviewMensualidadModalComponent;
  let fixture: ComponentFixture<PreviewMensualidadModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewMensualidadModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewMensualidadModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
