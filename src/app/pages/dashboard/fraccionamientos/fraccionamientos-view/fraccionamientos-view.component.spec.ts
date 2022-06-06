import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FraccionamientosViewComponent } from './fraccionamientos-view.component';

describe('FraccionamientosViewComponent', () => {
  let component: FraccionamientosViewComponent;
  let fixture: ComponentFixture<FraccionamientosViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FraccionamientosViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FraccionamientosViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
