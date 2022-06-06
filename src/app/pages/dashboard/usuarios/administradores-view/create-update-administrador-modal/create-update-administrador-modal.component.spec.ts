import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateAdministradorModalComponent } from './create-update-administrador-modal.component';

describe('CreateUpdateAdministradorModalComponent', () => {
  let component: CreateUpdateAdministradorModalComponent;
  let fixture: ComponentFixture<CreateUpdateAdministradorModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUpdateAdministradorModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateAdministradorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
