import { TestBed } from '@angular/core/testing';

import { SystechService } from './systech.service';

describe('SystechService', () => {
  let service: SystechService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SystechService);
  });

  it('should be created', () => {
    const service:SystechService=TestBed.get(SystechService);
    expect(service).toBeTruthy();
  });
});
