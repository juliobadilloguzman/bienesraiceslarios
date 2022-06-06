import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiarEstatusModalComponent } from './cambiar-estatus-modal.component';

describe('CambiarEstatusModalComponent', () => {
  let component: CambiarEstatusModalComponent;
  let fixture: ComponentFixture<CambiarEstatusModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CambiarEstatusModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CambiarEstatusModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
