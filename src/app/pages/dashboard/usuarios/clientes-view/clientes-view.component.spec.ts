import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesViewComponent } from './clientes-view.component';

describe('ClientesViewComponent', () => {
  let component: ClientesViewComponent;
  let fixture: ComponentFixture<ClientesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
