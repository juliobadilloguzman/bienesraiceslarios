import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturistasViewComponent } from './capturistas-view.component';

describe('CapturistasViewComponent', () => {
  let component: CapturistasViewComponent;
  let fixture: ComponentFixture<CapturistasViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapturistasViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturistasViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
