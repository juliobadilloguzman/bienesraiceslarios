import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendedoresViewComponent } from './vendedores-view.component';

describe('VendedoresViewComponent', () => {
  let component: VendedoresViewComponent;
  let fixture: ComponentFixture<VendedoresViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendedoresViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendedoresViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
