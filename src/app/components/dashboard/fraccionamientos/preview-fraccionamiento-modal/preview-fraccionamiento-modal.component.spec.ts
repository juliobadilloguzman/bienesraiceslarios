import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewFraccionamientoModalComponent } from './preview-fraccionamiento-modal.component';

describe('PreviewFraccionamientoModalComponent', () => {
  let component: PreviewFraccionamientoModalComponent;
  let fixture: ComponentFixture<PreviewFraccionamientoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewFraccionamientoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewFraccionamientoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
