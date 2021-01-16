import { TestBed } from '@angular/core/testing';

import { UiActionsService } from './ui-actions.service';

describe('UiActionsService', () => {
  let service: UiActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UiActionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
