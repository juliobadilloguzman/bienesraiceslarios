import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewVendedorModalComponent } from './preview-vendedor-modal.component';

describe('PreviewVendedorModalComponent', () => {
  let component: PreviewVendedorModalComponent;
  let fixture: ComponentFixture<PreviewVendedorModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewVendedorModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewVendedorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
