import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewAdministradorModalComponent } from './preview-administrador-modal.component';

describe('PreviewAdministradorModalComponent', () => {
  let component: PreviewAdministradorModalComponent;
  let fixture: ComponentFixture<PreviewAdministradorModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewAdministradorModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewAdministradorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
