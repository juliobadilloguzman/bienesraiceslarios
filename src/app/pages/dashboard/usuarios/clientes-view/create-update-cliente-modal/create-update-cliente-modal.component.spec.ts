import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateClienteModalComponent } from './create-update-cliente-modal.component';

describe('CreateUpdateClienteModalComponent', () => {
  let component: CreateUpdateClienteModalComponent;
  let fixture: ComponentFixture<CreateUpdateClienteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUpdateClienteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateClienteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
