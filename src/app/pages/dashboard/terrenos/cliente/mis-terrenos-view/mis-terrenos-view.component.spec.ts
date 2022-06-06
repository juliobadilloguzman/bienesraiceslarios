import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisTerrenosViewComponent } from './mis-terrenos-view.component';

describe('MisTerrenosViewComponent', () => {
  let component: MisTerrenosViewComponent;
  let fixture: ComponentFixture<MisTerrenosViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisTerrenosViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisTerrenosViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
