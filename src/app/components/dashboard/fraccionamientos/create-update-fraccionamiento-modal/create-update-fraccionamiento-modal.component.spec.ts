import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateFraccionamientoModalComponent } from './create-update-fraccionamiento-modal.component';

describe('CreateUpdateFraccionamientoModalComponent', () => {
  let component: CreateUpdateFraccionamientoModalComponent;
  let fixture: ComponentFixture<CreateUpdateFraccionamientoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUpdateFraccionamientoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateFraccionamientoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
