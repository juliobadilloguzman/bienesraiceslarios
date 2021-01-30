import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewCapturistaModalComponent } from './preview-capturista-modal.component';

describe('PreviewCapturistaModalComponent', () => {
  let component: PreviewCapturistaModalComponent;
  let fixture: ComponentFixture<PreviewCapturistaModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewCapturistaModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewCapturistaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
