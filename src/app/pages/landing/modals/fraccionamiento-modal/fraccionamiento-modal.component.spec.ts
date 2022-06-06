import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FraccionamientoModalComponent } from './fraccionamiento-modal.component';

describe('FraccionamientoModalComponent', () => {
  let component: FraccionamientoModalComponent;
  let fixture: ComponentFixture<FraccionamientoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FraccionamientoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FraccionamientoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
