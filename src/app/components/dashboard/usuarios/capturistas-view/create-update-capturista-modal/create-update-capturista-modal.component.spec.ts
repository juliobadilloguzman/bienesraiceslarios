import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateCapturistaModalComponent } from './create-update-capturista-modal.component';

describe('CreateUpdateCapturistaModalComponent', () => {
  let component: CreateUpdateCapturistaModalComponent;
  let fixture: ComponentFixture<CreateUpdateCapturistaModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUpdateCapturistaModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateCapturistaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
