import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerrenosViewComponent } from './terrenos-view.component';

describe('TerrenosViewComponent', () => {
  let component: TerrenosViewComponent;
  let fixture: ComponentFixture<TerrenosViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerrenosViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerrenosViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
