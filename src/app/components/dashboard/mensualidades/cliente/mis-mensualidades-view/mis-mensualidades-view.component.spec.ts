import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisMensualidadesViewComponent } from './mis-mensualidades-view.component';

describe('MisMensualidadesViewComponent', () => {
  let component: MisMensualidadesViewComponent;
  let fixture: ComponentFixture<MisMensualidadesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisMensualidadesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisMensualidadesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
