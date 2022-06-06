import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateVendedorModalComponent } from './create-update-vendedor-modal.component';

describe('CreateUpdateVendedorModalComponent', () => {
  let component: CreateUpdateVendedorModalComponent;
  let fixture: ComponentFixture<CreateUpdateVendedorModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUpdateVendedorModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateVendedorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
