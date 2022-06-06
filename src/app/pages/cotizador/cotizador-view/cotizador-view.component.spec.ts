import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CotizadorViewComponent } from './cotizador-view.component';

describe('CotizadorViewComponent', () => {
  let component: CotizadorViewComponent;
  let fixture: ComponentFixture<CotizadorViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CotizadorViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CotizadorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
