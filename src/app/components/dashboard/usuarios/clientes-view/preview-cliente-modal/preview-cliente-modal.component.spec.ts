import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewClienteModalComponent } from './preview-cliente-modal.component';

describe('PreviewClienteModalComponent', () => {
  let component: PreviewClienteModalComponent;
  let fixture: ComponentFixture<PreviewClienteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewClienteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewClienteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
