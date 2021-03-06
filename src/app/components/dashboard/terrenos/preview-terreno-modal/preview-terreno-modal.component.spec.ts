import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewTerrenoModalComponent } from './preview-terreno-modal.component';

describe('PreviewTerrenoModalComponent', () => {
  let component: PreviewTerrenoModalComponent;
  let fixture: ComponentFixture<PreviewTerrenoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewTerrenoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewTerrenoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
