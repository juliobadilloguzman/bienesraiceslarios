import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiCuentaViewComponent } from './mi-cuenta-view.component';

describe('MiCuentaViewComponent', () => {
  let component: MiCuentaViewComponent;
  let fixture: ComponentFixture<MiCuentaViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiCuentaViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiCuentaViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
