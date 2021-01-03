import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanoInteractivoComponent } from './plano-interactivo.component';

describe('PlanoInteractivoComponent', () => {
  let component: PlanoInteractivoComponent;
  let fixture: ComponentFixture<PlanoInteractivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanoInteractivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanoInteractivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
