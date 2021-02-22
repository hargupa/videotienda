import { TestBed } from '@angular/core/testing';

import { VideotiendaService } from './videotienda.service';

describe('VideotiendaService', () => {
  let service: VideotiendaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideotiendaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
